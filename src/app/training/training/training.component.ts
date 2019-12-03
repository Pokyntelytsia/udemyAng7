import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training/training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {

  constructor(private trainingService: TrainingService) { }

  ongoingTraining = false;
  exerciseChangedSub: Subscription;

  ngOnInit() {
    this.exerciseChangedSub = this.trainingService.exerciseChanged.subscribe(exercise => {
      this.ongoingTraining = !!exercise;
    })
  }

  ngOnDestroy() {
    if(this.exerciseChangedSub) {
      this.exerciseChangedSub.unsubscribe();
    }
  }

}
