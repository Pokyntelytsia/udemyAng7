import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from "../training/training/training.component";

const routes: Route[] = [
  {
    path: '',
    component: TrainingComponent,
  }, {
    path: '**',
    redirectTo: '/welcome',
    pathMatch: 'full' 
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TrainingRoutingModule { }
