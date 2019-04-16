import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<void> ();

  navLists = [
    {
      name: "Signup",
      icon: 'face',
      link: "/signup",
      anonymus: true
    },{
      name: "Login",
      icon: 'exit_to_app',
      link: "/login",
      anonymus: true
    },{
      name: "Training",
      icon: 'fitness_center',
      link: "/training",
      anonymus: false
    }
  ]

  onSidenavClose():void {
    this.closeEvent.emit();
  }

  logout() {
    this.authService.logout();
  }

  constructor(private authService: AuthService) { }
  isAuth = false;
  authSubscription: Subscription;

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

}
