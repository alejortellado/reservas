import { Component, OnInit } from '@angular/core';
import {BackService} from "../../service/back.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-listar-habitaciones',
  templateUrl: './listar-habitaciones.component.html',
  styleUrls: ['./listar-habitaciones.component.css']
})
export class ListarHabitacionesComponent implements OnInit {
  public habitaciones:any;

  constructor(
    private back: BackService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.listarHabitaciones();
  }

  listarHabitaciones(){
    this.back.getHabitaciones().subscribe(habitaciones => {
      this.habitaciones = habitaciones["rows"];
    })
  }

  crear(){
    this.router.navigate(['./crear'],{relativeTo: this.activatedRoute});
  }

  editar(id,dato){
    this.router.navigate(['./',id],{state:{ dato: dato},relativeTo: this.activatedRoute});
  }

  eliminar(id){
    this.back.eliminarHabitacion(id).subscribe(resp =>{
      this.listarHabitaciones();
    })
  }

  goTo(){
    this.router.navigate(['./'],);
  }
}
