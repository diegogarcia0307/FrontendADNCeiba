import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/modals/DialogData';
import { Vehiculo } from 'src/app/class/vehiculo';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  public vehiculo: Vehiculo;

  constructor(
    public dialogRef: MatDialogRef<CrearComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  registrarVehiculo() {

  }

  ngOnInit() {
  }

}
