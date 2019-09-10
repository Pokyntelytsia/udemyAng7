import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training/training.service';
import { Exercise } from '../training/exrcise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  availableTrainings: Exercise[];
  trainingsSub: Subscription;
  isLoading = true;
  constructor(private trainingService: TrainingService) {  }

  addTraining (form: NgForm) {
    this.trainingService.exerciseStart(form.value.exercise);
  }

  ngOnInit() {
     this.trainingsSub = this.trainingService.exercisesChanged.subscribe(data => {
      this.availableTrainings = data;
      this.isLoading = false;
     });
     this.trainingService.getExercises();
  }

  ngOnDestroy() {
    this.trainingsSub.unsubscribe();
  }

}
