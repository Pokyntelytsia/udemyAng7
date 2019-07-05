import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-current-training.component';
import { TrainingService } from '../training/training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})

export class CurrentTrainingComponent implements OnInit {
  progress = 0;

  progressInterval: number;

  startProgress() {
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.progressInterval = window.setInterval(() => {
      if(this.progress >= 100) {
        this.trainingService.exerciseComplete();
        window.clearInterval(this.progressInterval);
      }
      else
        this.progress+=5;
    }, step)
  }

  onStopProgress() {
    window.clearInterval(this.progressInterval);
    const dialogRef = this.matDialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.trainingService.exerciseCancele(this.progress);
      } else {
        this.startProgress();
      }
    })
  }

  constructor(private matDialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.startProgress();
  }

}
