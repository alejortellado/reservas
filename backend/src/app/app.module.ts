import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarPersonasComponent } from './personas/listar-personas/listar-personas.component';
import { CrearPersonaComponent } from './personas/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './personas/editar-persona/editar-persona.component';
import {BackService} from "./service/back.service";
import {HttpClientModule} from "@angular/common/http";
import { InicioComponent } from './inicio/inicio.component';
import {FormsModule} from "@angular/forms";
import { ListarHabitacionesComponent } from './habitaciones/listar-habitaciones/listar-habitaciones.component';
import { CrearHabitacionComponent } from './habitaciones/crear-habitacion/crear-habitacion.component';
import { EditarHabitacionComponent } from './habitaciones/editar-habitacion/editar-habitacion.component';
import { ListarReservasComponent } from './reservas/listar-reservas/listar-reservas.component';
import { CrearReservaComponent } from './reservas/crear-reserva/crear-reserva.component';
import { EditarReservaComponent } from './reservas/editar-reserva/editar-reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarPersonasComponent,
    CrearPersonaComponent,
    EditarPersonaComponent,
    InicioComponent,
    ListarHabitacionesComponent,
    CrearHabitacionComponent,
    EditarHabitacionComponent,
    ListarReservasComponent,
    CrearReservaComponent,
    EditarReservaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [BackService],
  bootstrap: [AppComponent]
})
export class AppModule { }
