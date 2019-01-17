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
  MatToolbarModule
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
    MatToolbarModule
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
    MatToolbarModule
  ]
})

export class MaterialModule { }
