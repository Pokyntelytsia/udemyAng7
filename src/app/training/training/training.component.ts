import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  constructor(private trainingService: TrainingService) { }

  ongoingTraining = false;

  ngOnInit() {
    this.trainingService.exerciseChanged.subscribe(exercise => {
      console.log('subscr');
    })
  }

}
