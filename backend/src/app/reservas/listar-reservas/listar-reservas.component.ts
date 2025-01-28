import { Component, OnInit } from '@angular/core';
import {BackService} from "../../service/back.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-listar-reservas',
  templateUrl: './listar-reservas.component.html',
  styleUrls: ['./listar-reservas.component.css']
})
export class ListarReservasComponent implements OnInit {
  public reservas:any;
  public habitaciones:any;
  public personas:any;

  constructor(
    private back: BackService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.listarPersonas();
    this.listarHabitaciones();
    this.listarReservas();
  }

  listarReservas(){
    this.back.getReservas().subscribe(reservas => {
      this.reservas = reservas["rows"];
    })
  }

  listarHabitaciones(){
    this.back.getHabitaciones().subscribe(habitaciones => {
      this.habitaciones = habitaciones["rows"];
    })
  }

  listarPersonas(){
    this.back.getPersonas().subscribe(personas => {
      this.personas = personas["rows"];
    })
  }

  getPersonaNombre(id: number): string {
    const persona = this.personas.find(p => p.id === id);
    return persona ? persona.nombrecompleto : 'Desconocido';
  }

  getHabitacionNro(id: number): string {
    const habitacion = this.habitaciones.find(h => h.id === id);
    return habitacion ? habitacion.habitacionnro : 'Desconocido';
  }

  crear(){
    this.router.navigate(['./crear'],{relativeTo: this.activatedRoute});
  }

  editar(id,dato){
    this.router.navigate(['./',id],{state:{ dato: dato},relativeTo: this.activatedRoute});
  }

  eliminar(id){
    this.back.eliminarHabitacion(id).subscribe(resp =>{
      this.listarReservas();
    })
  }

  goTo(){
    this.router.navigate(['./'],);
  }
}
