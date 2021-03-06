import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'app-stop-training',
    template: `
    <h1 mat-dialog-title>Are you sure?</h1>
    <div mat-dialog-content>
        <p>You already done {{ passedData.progress }}%</p>
    </div>
    <div mat-dialog-actions>
        <button mat-button [mat-dialog-close]="false">No</button>
        <button mat-button [mat-dialog-close]="true">Yes</button>
    </div>
    `
})
export class StopTrainingComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public passedData: any ) {}
}