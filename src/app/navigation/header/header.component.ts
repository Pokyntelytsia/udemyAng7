import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleEvent = new EventEmitter<void> ();

  onSidenavToggle():void {
    this.toggleEvent.emit();
  }

  constructor(private authService: AuthService,
    private store: Store< fromApp.State>) { }
  isAuth$: Observable<boolean>;

  logout() {
    console.log('logout');
    this.authService.logout();
  }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromApp.getIsAuth);
  }

}
