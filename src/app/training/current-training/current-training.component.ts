import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {Store} from '@ngrx/store';
import { StopTrainingComponent } from './stop-current-training.component';
import { TrainingService } from '../training/training.service';
import * as fromTraining from '../../store/training.reducer'
import * as Training from '../../store/training.actions';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})

export class CurrentTrainingComponent implements OnInit {
  progress = 0;

  progressInterval: number;

  startProgress() {
    this.store.select(fromTraining.getActiveTraining).subscribe(ex => {
      const step = ex.duration / 100 * 1000;
      this.progressInterval = window.setInterval(() => {
        if(this.progress >= 100) {
          this.store.dispatch( new Training.StopTraining());
          window.clearInterval(this.progressInterval);
        }
        else
          this.progress+=5;
      }, step)
    })
  
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

  constructor(private matDialog: MatDialog, private trainingService: TrainingService,
    private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.startProgress();
  }

}
