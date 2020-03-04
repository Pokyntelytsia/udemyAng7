import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'

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

  constructor(private authService: AuthService,
    private store: Store< fromApp.State>) { }
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;

  logout() {
    console.log('logout');
    this.authService.logout();
  }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromApp.getIsAuth);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
