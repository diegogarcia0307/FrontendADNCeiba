import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogData } from "src/app/modals/DialogData";
import { Vehiculo } from "src/app/class/vehiculo";
import { ConexionBDService } from "src/app/services/conexion-bd.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-crear",
  templateUrl: "./crear.component.html",
  styleUrls: ["./crear.component.css"]
})
export class CrearComponent implements OnInit {
  public vehiculo = new Vehiculo("", "", "", "", 0);
  public placa: string;

  constructor(
    public dialogRef: MatDialogRef<CrearComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private conexion: ConexionBDService,
    private router: Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  registrarVehiculo() {
    this.conexion.ingresarVehiculo(this.vehiculo).subscribe(
      data => {
        console.log(data);
        if (data['estadoOperacion']) {
          this.dialogRef.close();
          Swal.fire(
            "Vehículo registrado",
            "El vehículo puede ingresar. Acceso autorizado!",
            "success"
          );
        }
      },
      err => {
        Swal.fire("Error al ingresar el vehículo", err.error.message, "info");
      }
    );
  }

  ngOnInit() {}
}
