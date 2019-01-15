import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({
    formEmailControl:  new FormControl(''),
    formPasswordControl:  new FormControl('123asd')
  })
  
  constructor() { }

  private addGradientClass(): void {
    document.body.classList.add('auth-page-gradient');
  }

  private removeGradientClass(): void {
    document.body.classList.remove('auth-page-gradient');
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
  }

  ngOnInit() {
    this.addGradientClass();
  }

  ngOnDestroy() {
    this.removeGradientClass();
  }

}
