import { Action } from '@ngrx/store';

export const SET_AUTH = '[Auth] Start Auth';
export const SET_UNAUTH = '[Auth] Stop Unauth';

export class SetAuth implements Action {
    readonly type = SET_AUTH;
}

export class SetUnAuth implements Action {
    readonly type = SET_UNAUTH;
}

export type AuthActions = SetAuth | SetUnAuth;