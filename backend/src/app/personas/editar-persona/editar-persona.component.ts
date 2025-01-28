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
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit {

  public persona:PersonaInterface;
  public id:number;

  constructor(
    private back: BackService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    const navegation = this.router.getCurrentNavigation();
    if (navegation?.extras.state) {
      this.persona = navegation.extras.state["dato"];
    }
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  editarPersona(){
    this.back.editarPersona(this.id,JSON.stringify(this.persona)).subscribe(resp=>{
      this.cancelar();
    });
  }

  cancelar(){
    this.router.navigate(['../'],{relativeTo: this.activatedRoute});
  }

}
