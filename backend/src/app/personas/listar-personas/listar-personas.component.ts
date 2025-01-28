import { Component, OnInit } from '@angular/core';
import {BackService} from "../../service/back.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-listar-personas',
  templateUrl: './listar-personas.component.html',
  styleUrls: ['./listar-personas.component.css']
})
export class ListarPersonasComponent implements OnInit {

  public personas:any;

  constructor(
    private back: BackService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.listarPersonas();
  }

  listarPersonas(){
    this.back.getPersonas().subscribe(personas => {
      this.personas = personas["rows"];
    })
  }

  crear(){
    this.router.navigate(['./crear'],{relativeTo: this.activatedRoute});
  }

  editar(id,dato){
    this.router.navigate(['./',id],{state:{ dato: dato},relativeTo: this.activatedRoute});
  }

  eliminar(id){
    this.back.eliminarPersona(id).subscribe(resp =>{
      this.listarPersonas();
    })
  }

  goTo(){
    this.router.navigate(['./'],);
  }
}
