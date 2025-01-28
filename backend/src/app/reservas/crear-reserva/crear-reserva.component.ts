import { Component, OnInit } from '@angular/core';
import {BackService} from "../../service/back.service";
import {ActivatedRoute, Router} from "@angular/router";

export class ReservaInterface {
  constructor(
    public habitacionid?: number,
    public personaid?:number,
    public fechasalida?:string,
    public fechaentrada?:string)
  {}
}
@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {

  public reserva:ReservaInterface;
  public habitaciones:any;
  public personas:any;

  constructor(
    private back: BackService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.reserva = new ReservaInterface();
    this.listarPersonas();
    this.listarHabitaciones();
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

  crearReserva(){
    this.back.crearReserva(JSON.stringify(this.reserva)).subscribe(resp=>{
      this.cancelar();
    });
  }

  cancelar(){
    this.router.navigate(['../'],{relativeTo: this.activatedRoute});
  }
}
