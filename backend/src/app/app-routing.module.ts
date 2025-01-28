import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListarPersonasComponent} from "./personas/listar-personas/listar-personas.component";
import {InicioComponent} from "./inicio/inicio.component";
import {CrearPersonaComponent} from "./personas/crear-persona/crear-persona.component";
import {EditarPersonaComponent} from "./personas/editar-persona/editar-persona.component";
import {ListarHabitacionesComponent} from "./habitaciones/listar-habitaciones/listar-habitaciones.component";
import {CrearHabitacionComponent} from "./habitaciones/crear-habitacion/crear-habitacion.component";
import {EditarHabitacionComponent} from "./habitaciones/editar-habitacion/editar-habitacion.component";
import {ListarReservasComponent} from "./reservas/listar-reservas/listar-reservas.component";
import {CrearReservaComponent} from "./reservas/crear-reserva/crear-reserva.component";
import {EditarReservaComponent} from "./reservas/editar-reserva/editar-reserva.component";

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'personas',component: ListarPersonasComponent },
  { path: 'personas/crear',component: CrearPersonaComponent },
  { path: 'personas/:id',component: EditarPersonaComponent },
  { path: 'habitaciones',component: ListarHabitacionesComponent },
  { path: 'habitaciones/crear',component: CrearHabitacionComponent },
  { path: 'habitaciones/:id',component: EditarHabitacionComponent },
  { path: 'reservas',component: ListarReservasComponent },
  { path: 'reservas/crear',component: CrearReservaComponent },
  { path: 'reservas/:id',component: EditarReservaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
