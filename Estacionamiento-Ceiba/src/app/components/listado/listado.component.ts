import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { ListadoDataSource, ListadoItem } from './listado-datasource';
import { ConexionBDService } from 'src/app/services/conexion-bd.service';

export interface PeriodicElement {
  tipo: string;
  placa: string;
  fecha: string;
}



@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  public data: PeriodicElement[] = [
  ];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: string[] = ['tipo', 'placa', 'fecha'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.data);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.cargarLista();
  }

  constructor(
    private conexion: ConexionBDService
  ) {

  }

  cargarLista() {
    this.conexion.obtenerLista().subscribe(
      data => {
        this.llenarInformacion(data);
      }
    );
  }

  llenarInformacion(info: any[]) {
    //  console.log(info);
    info.forEach(element => {
      //console.log(element);
      this.data.push({
        'tipo': element.vehiculo.tipo,
        'placa': element.vehiculo.placa,
        'fecha': element.fechaIngreso
      });
    });
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.data);
    console.log(this.data);

  }

}
