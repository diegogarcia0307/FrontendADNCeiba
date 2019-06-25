import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { ListadoDataSource, ListadoItem } from './listado-datasource';
import { ConexionBDService } from 'src/app/services/conexion-bd.service';
import Swal from 'sweetalert2';

export interface PeriodicElement {
  tipo: string;
  placa: string;
  fecha: Date;
  boton: string;
}


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  public data: PeriodicElement[] = [
  ];

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['tipo', 'placa', 'fecha', 'boton'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;



  ngOnInit() {
    this.cargarLista();
  }

  constructor(
    private conexion: ConexionBDService
  ) {

  }

  cargarLista() {
    this.data = new Array();
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.data);

    this.conexion.obtenerLista().subscribe(
      data => {
        this.llenarInformacion(data);
      }
    );
  }

  llenarInformacion(info: any[]) {

    if (info.length > 0) {
      info.forEach(element => {
        this.data.push({
          'tipo': element.vehiculo.tipo,
          'placa': element.vehiculo.placa,
          'fecha': element.fechaIngreso,
          'boton': 'Dar salida'
        });
      });

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    } else {
      Swal.fire('No hay vehículos en el parqueadero', 'No se encontró ningún vehículo registrado como ingresado.', 'info');
    }
  }

  darSalida(placa: string) {
    Swal.fire({
      title: '¿Está seguro?',
      text: "La decisión no se podra revertir!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, seguro!'
    }).then((result) => {
      if (result.value) {
        this.conexion.darSalida(placa).subscribe(
          data => {
            Swal.fire("Valor a pagar: $" + data, 'Placa del vehículo: ' + placa, "success").then((result) => {
              this.cargarLista()
            }
            );
          }
        );
      }
    });
  }

}
