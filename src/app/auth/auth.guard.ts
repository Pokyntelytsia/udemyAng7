import {CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {take} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor( private store: Store<fromApp.State> ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromApp.getIsAuth).pipe(
            take(1)
        );
    }
    canLoad(route: Route) {
        return this.store.select(fromApp.getIsAuth).pipe(
            take(1)
        );
    }
}