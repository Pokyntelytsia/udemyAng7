import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";

const routes: Route[] = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
}, {
    path: 'signup',
    component: SignupComponent
}, {
    path: 'login',
    component: LoginComponent
},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AuthRoutingModule { }
