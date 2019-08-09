import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training/training.service';

@Injectable()
export class AuthService {
    private user: User;
    authChange = new Subject <boolean>();
    constructor(private router: Router, 
        private angularFireAuth: AngularFireAuth, 
        private trainingService: TrainingService){}

    initAuthListener() {
        this.angularFireAuth.authState.subscribe(user => {
            if(user) {
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelFbSubs();
                this.user = null;
                this.authChange.next(false);
                this.router.navigate(['/login']);
            }
        })
    }
    register (authData: AuthData) {
        this.angularFireAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).
        then(auth => {
            this.user = {
                email: authData.email,
                id: Math.round(Math.random() * 10000).toString()
            };
        })
        .catch(err => {
            console.error(authData);
        });
    }

    login(authData: AuthData) {
        
        this.angularFireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(data => {
            this.user = {
                email: authData.email,
                id: Math.round(Math.random() * 10000).toString()
            };
        }).catch(err => {
            console.log(err);
        });
        
    }

    logout() {
        this.angularFireAuth.auth.signOut();
    }

    getUser() {
        return { ...this.user };
    }
    isAuth() {
        return this.user != null;
    }
}