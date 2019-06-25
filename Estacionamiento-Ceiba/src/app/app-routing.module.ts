import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListadoComponent } from './components/listado/listado.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard/inicio', component: DashboardComponent },
  { path: 'listar', component: ListadoComponent },
  { path: '**', redirectTo: 'dashboard/inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
