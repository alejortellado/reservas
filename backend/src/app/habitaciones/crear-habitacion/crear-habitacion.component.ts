import { Component, OnInit } from '@angular/core';
import {BackService} from "../../service/back.service";
import {ActivatedRoute, Router} from "@angular/router";


export class HabitacionInterface {
  constructor(
    public habitacionpiso?: number,
    public habitacionnro?:number,
    public cantcamas?:number,
    public tienetelevision?:boolean,
    public tienefrigobar?:boolean)
  {}
}

@Component({
  selector: 'app-crear-habitacion',
  templateUrl: './crear-habitacion.component.html',
  styleUrls: ['./crear-habitacion.component.css']
})
export class CrearHabitacionComponent implements OnInit {
  public habitacion:HabitacionInterface;


  constructor(
    private back: BackService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.habitacion = new HabitacionInterface();
  }


  crearHabitacion(){
    this.back.crearHabitacion(JSON.stringify(this.habitacion)).subscribe(resp=>{
      this.cancelar();
    });
  }

  cancelar(){
    this.router.navigate(['../'],{relativeTo: this.activatedRoute});
  }
}
