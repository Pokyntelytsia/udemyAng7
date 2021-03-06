import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from '../../validators/email.validator';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromAPP from '../../store/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor( 
    private fb: FormBuilder, 
    private authService: AuthService,
    private store: Store<fromAPP.State>
    ) { }
  isLoading$: Observable<boolean>;

  loginForm: FormGroup = this.fb.group({
    formEmailControl: ['', emailValidator()],
    formPasswordControl: ['123', Validators.required]
  })

  get emailForm() {
    return this.loginForm.get('formEmailControl');
  }

  get passwordForm() {
    return this.loginForm.get('formPasswordControl');
  }
  
  private addGradientClass(): void {
    document.body.classList.add('auth-page-gradient');
  }

  private removeGradientClass(): void {
    document.body.classList.remove('auth-page-gradient');
  }

  onSubmit(): void {
    this.authService.login({
      email: this.emailForm.value,
      password: this.passwordForm.value
    })
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromAPP.getIsLoading);
    this.addGradientClass();
    
  }

  ngOnDestroy() {
    this.removeGradientClass();
  }

}
