import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  private addGradientClass(): void {
    document.body.classList.add('auth-page-gradient');
  }

  private removeGradientClass(): void {
    document.body.classList.remove('auth-page-gradient');
  }
  constructor(private authService: AuthService) { }

  maxBirthdate: Date;

  onSubmit(form: NgForm):void {
    if(form.invalid)
    return;
    this.authService.register({
      email: form.value.email,
      password: form.value.password
    })
  }
  
  ngOnInit() {
    this.addGradientClass();
    this.maxBirthdate = new Date();
    this.maxBirthdate.setFullYear(this.maxBirthdate.getFullYear() - 18);
  }
  
  ngOnDestroy() {
    this.removeGradientClass();
  }

}
