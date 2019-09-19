import { NgModule } from "@angular/core";
import { TrainingComponent } from "./training.component";
import { CurrentTrainingComponent } from '../current-training/current-training.component';
import { NewTrainingComponent } from '../new-training/new-training.component';
import { PastTrainingsComponent } from '../past-trainings/past-trainings.component';
import { StopTrainingComponent } from '../current-training/stop-current-training.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        StopTrainingComponent,
    ],
    imports: [
        MaterialModule,
        CommonModule,
        FormsModule,
    ],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule{}