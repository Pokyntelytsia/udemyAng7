import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UIService {

  constructor() { }

  isLoading = new Subject();
}
