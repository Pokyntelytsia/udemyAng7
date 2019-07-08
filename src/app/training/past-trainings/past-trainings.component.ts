import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Exercise } from '../training/exrcise.model';
import { TrainingService } from '../training/training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit {

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.pastTrainings.data = this.trainingService.getFinishedExercises();
    console.log('this.dataSource.data',this.pastTrainings.data);
  }

  pastTrainings = new MatTableDataSource<Exercise>();

  columnsToDisplay = ['name', 'duration','date', 'calories', 'state'];

}
