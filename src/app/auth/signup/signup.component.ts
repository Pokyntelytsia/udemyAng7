import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  constructor(
    private uiService: UIService, 
    private authService: AuthService) {} 
  private addGradientClass(): void {
    document.body.classList.add('auth-page-gradient');
  }

  isLoading: boolean = false;
  private isLoadingSub: Subscription;

  private removeGradientClass(): void {
    document.body.classList.remove('auth-page-gradient');
  }

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
    this.isLoadingSub = this.uiService.isLoading.subscribe((isloading: boolean) => {
      this.isLoading = isloading;
    })
  }
  
  ngOnDestroy() {
    this.removeGradientClass();
    this.isLoadingSub.unsubscribe();
  }

}
