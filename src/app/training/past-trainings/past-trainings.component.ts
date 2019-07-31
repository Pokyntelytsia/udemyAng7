import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../training/exrcise.model';
import { TrainingService } from '../training/training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, OnDestroy, AfterViewInit {

  pastTrainings = new MatTableDataSource<Exercise>();
  columnsToDisplay = ['name', 'duration','date', 'calories', 'state'];
  pastTrainingsSub: Subscription;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(private trainingService: TrainingService) { }

  doFiltering(filterValue: string) {
    this.pastTrainings.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.trainingService.fetchFinishedExercises();
    this.pastTrainingsSub = this.trainingService.pastExercisesChanged.subscribe(data => {
      this.pastTrainings.data = data;
    });
    this.pastTrainings.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.pastTrainingsSub.unsubscribe();
  }

  ngAfterViewInit() {
    this.pastTrainings.sort = this.sort;
  }
}
