import { Component, OnInit } from '@angular/core';
import {BackService} from "../../service/back.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HabitacionInterface} from "../crear-habitacion/crear-habitacion.component";

export class PersonaInterface {
  constructor(
    public nombrecompleto?: string,
    public nrodocumento?:string,
    public correo?:string,
    public telefono?:string)
  {}
}
@Component({
  selector: 'app-editar-habitacion',
  templateUrl: './editar-habitacion.component.html',
  styleUrls: ['./editar-habitacion.component.css']
})
export class EditarHabitacionComponent implements OnInit {
  public habitacion:HabitacionInterface;
  public id:number;

  constructor(
    private back: BackService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    const navegation = this.router.getCurrentNavigation();
    if (navegation?.extras.state) {
      this.habitacion = navegation.extras.state["dato"];
    }
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }


  editarHabitacion(){
    this.back.editarHabitacion(this.id,JSON.stringify(this.habitacion)).subscribe(resp=>{
      this.cancelar();
    });
  }

  cancelar(){
    this.router.navigate(['../'],{relativeTo: this.activatedRoute});
  }
}
