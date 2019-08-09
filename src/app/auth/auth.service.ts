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
        this.authSuccess();
    }

    login(authData: AuthData) {
        
        this.angularFireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(data => {
            this.authSuccess();
            this.user = {
                email: authData.email,
                id: Math.round(Math.random() * 10000).toString()
            };
        }).catch(err => {
            console.log(err);
        });
        
    }

    logout() {
        this.trainingService.cancelFbSubs();
        this.angularFireAuth.auth.signOut();
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    private authSuccess() {
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }

    getUser() {
        return { ...this.user };
    }
    isAuth() {
        return this.user != null;
    }
}