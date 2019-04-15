import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from '../../validators/email.validator';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

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
  
  constructor( private fb: FormBuilder, private authService: AuthService) { }

  private addGradientClass(): void {
    document.body.classList.add('auth-page-gradient');
  }

  private removeGradientClass(): void {
    document.body.classList.remove('auth-page-gradient');
  }

  onSubmit(): void {
    console.log(this.loginForm, this.emailForm);
    this.authService.login({
      email: this.emailForm.value,
      password: this.passwordForm.value
    })
  }

  ngOnInit() {
    this.addGradientClass();
  }

  ngOnDestroy() {
    this.removeGradientClass();
  }

}
