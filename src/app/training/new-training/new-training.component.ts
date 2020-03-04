import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training/training.service';
import { Exercise } from '../training/exrcise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from '../../store/training.reducer'
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  availableTrainings$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;
  constructor(private trainingService: TrainingService,
    private store: Store<fromTraining.State>,
    ) { }

  addTraining(form: NgForm) {
    this.trainingService.exerciseStart(form.value.exercise);
  }

  fetchTrainings() {
    this.trainingService.getExercises();
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromApp.getIsLoading);
    this.availableTrainings$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchTrainings();
  }

}
