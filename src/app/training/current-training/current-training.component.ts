import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-current-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})

export class CurrentTrainingComponent implements OnInit {
  progress = 0;

  progressInterval: number;

  startProgress() {
    this.progressInterval = window.setInterval(() => {
      if(this.progress >= 100)
        window.clearInterval(this.progressInterval);
      else
        this.progress+=5;
    }, 1000)
  }

  onStopProgress() {
    window.clearInterval(this.progressInterval);
    this.matDialog.open(StopTrainingComponent);
  }

  constructor(private matDialog: MatDialog) { }

  ngOnInit() {
    this.startProgress();
  }

}
