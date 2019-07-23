import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../training/exrcise.model';
import { TrainingService } from '../training/training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

  pastTrainings = new MatTableDataSource<Exercise>();
  columnsToDisplay = ['name', 'duration','date', 'calories', 'state'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.pastTrainings.data = this.trainingService.getFinishedExercises();
    this.pastTrainings.paginator = this.paginator;
    console.log('this.dataSource.data',this.pastTrainings.data);
  }

  ngAfterViewInit() {
    this.pastTrainings.sort = this.sort;
  }

  doFiltering(filterValue: string) {
    this.pastTrainings.filter = filterValue.trim().toLowerCase();
  }
}
