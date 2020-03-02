import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import { TrainingService } from '../training/training/training.service';
import { UIService } from '../shared/ui.service';
import * as fromApp from '../store/app.reducer';
import * as UI from '../store/ui.actions';

@Injectable()
export class AuthService {
    private user: User;
    authChange = new Subject <boolean>();
    constructor(private router: Router, 
        private angularFireAuth: AngularFireAuth, 
        private uiService: UIService,
        private trainingService: TrainingService,
        private store: Store<fromApp.State>){}

    initAuthListener() {
        this.angularFireAuth.authState.subscribe(user => {
            if(user) {
                this.user = {...user, id: '0'};
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
        this.store.dispatch( new UI.StartLoading() );
        this.angularFireAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).
        then(auth => {
            this.user = {
                email: authData.email,
                id: Math.round(Math.random() * 10000).toString()
            };
            this.store.dispatch( new UI.StopLoading());
        })
        .catch(err => {
            this.uiService.showNotification(err.message, null, 3000);
            this.store.dispatch( new UI.StopLoading());
        });
    }

    login(authData: AuthData) {
        this.store.dispatch( new UI.StartLoading());
        this.angularFireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(data => {
            this.user = {
                email: authData.email,
                id: Math.round(Math.random() * 10000).toString()
            };
            this.store.dispatch( new UI.StopLoading());
        }).catch(err => {
            this.uiService.showNotification(err.message, null, 3000);
            this.store.dispatch( new UI.StopLoading());
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