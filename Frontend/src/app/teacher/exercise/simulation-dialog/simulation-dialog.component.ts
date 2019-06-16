import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-simulation-dialog',
  templateUrl: './simulation-dialog.component.html',
  styleUrls: ['./simulation-dialog.component.css'],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class SimulationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SimulationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  onNoClick(): void {
    console.log(this.dialogRef);
    this.dialogRef.close(true);
  }

}
