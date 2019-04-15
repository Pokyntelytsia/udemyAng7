import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() toggleEvent = new EventEmitter<void> ();

  onSidenavToggle():void {
    this.toggleEvent.emit();
  }

  constructor(private authService: AuthService) { }
  isAuth = false;
  authSubscription: Subscription;

  logout() {
    console.log('logout');
    this.authService.logout();
  }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
