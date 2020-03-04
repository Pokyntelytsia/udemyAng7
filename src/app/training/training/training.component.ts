import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training/training.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromTraining from '../../store/training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ongoingTraining$: Observable<boolean>;

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
  }

}
