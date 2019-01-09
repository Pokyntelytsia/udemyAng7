import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  formEmailControl: FormControl = new FormControl('');
  formPasswordControl: FormControl = new FormControl('123asd');
  
  constructor() { }

  private addGradientClass(): void {
    document.body.classList.add('auth-page-gradient');
  }

  private removeGradientClass(): void {
    document.body.classList.remove('auth-page-gradient');
  }

  onSubmit(): void {
    console.log(this.formEmailControl);
  }

  ngOnInit() {
    this.formEmailControl.setValue('some@email.com');
    this.addGradientClass();
  }

  ngOnDestroy() {
    this.removeGradientClass();
  }

}
