import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../training/exrcise.model';
import { TrainingService } from '../training/training.service';
import * as fromTraining from '../../store/training.reducer';
import {Store} from '@ngrx/store';

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
  
  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  doFiltering(filterValue: string) {
    this.pastTrainings.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.trainingService.fetchFinishedExercises();
    this.store.select(fromTraining.getFinishedExercises).subscribe(ex => {
      this.pastTrainings.data = ex;
    });
    this.pastTrainings.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.pastTrainings.sort = this.sort;
  }

}
