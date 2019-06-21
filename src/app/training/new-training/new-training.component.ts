import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training/training.service';
import { Exercise } from '../training/exrcise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  availableTrainings: Exercise[] = [];
  constructor(private trainingService: TrainingService) {  }

  addTraining (form: NgForm) {
    this.trainingService.exerciseStart(form.value.exercise);
  }

  ngOnInit() {
    this.availableTrainings = this.trainingService.getExercises();
  }

}
