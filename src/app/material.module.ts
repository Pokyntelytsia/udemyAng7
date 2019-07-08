import { NgModule } from '@angular/core';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { 
  MatButtonModule, 
  MatIconModule, 
  MatFormFieldModule, 
  MatInputModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableModule
 } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule
  ]
})

export class MaterialModule { }
