import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor() { }

  maxBirthdate: Date;

  ngOnInit() {
    this.maxBirthdate = new Date();
    this.maxBirthdate.setFullYear(this.maxBirthdate.getFullYear() - 18);
  }

  onSubmit(form: NgForm):void {
    console.log(form);
  }

}
