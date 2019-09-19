import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UIService {

  constructor(
    private snBar: MatSnackBar,
  ) { }

  isLoading = new Subject();

  showNotification(message, action, duration) {
    this.snBar.open(message, action, {
      duration,
    });
  }
}
