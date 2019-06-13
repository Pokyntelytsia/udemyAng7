import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training/training.service';
import { Exercise } from '../training/exrcise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  availableTrainings: Exercise[] = [];
  constructor(private trainingService: TrainingService) {  }

  addTraining () {
    this.trainingService.exerciseStart('12');
  }

  ngOnInit() {
    this.availableTrainings = this.trainingService.getExercises();
  }

}
