import { Component, OnInit } from '@angular/core';
import {BackService} from "../../service/back.service";
import {ActivatedRoute, Router} from "@angular/router";

export class PersonaInterface {
  constructor(
    public nombrecompleto?: string,
    public nrodocumento?:string,
    public correo?:string,
    public telefono?:string)
  {}
}
@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {

  public persona:PersonaInterface;


  constructor(
    private back: BackService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.persona = new PersonaInterface();
  }


  crearPersona(){
    this.back.crearPersona(JSON.stringify(this.persona)).subscribe(resp=>{
      this.cancelar();
    });
  }

  cancelar(){
    this.router.navigate(['../'],{relativeTo: this.activatedRoute});
  }
}
