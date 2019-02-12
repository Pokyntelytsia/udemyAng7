import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;

  startProgress() {
    const progressInterval = setInterval(() => {
      if(this.progress >= 100)
        clearInterval(progressInterval);
      else
        this.progress+=5;
    }, 1000)
  }

  constructor() { }

  ngOnInit() {
    this.startProgress();
  }

}
