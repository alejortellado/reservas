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
  selector: 'app-editar-reserva',
  templateUrl: './editar-reserva.component.html',
  styleUrls: ['./editar-reserva.component.css']
})
export class EditarReservaComponent implements OnInit {
  public reserva:ReservaInterface;
  public id:number;
  public habitaciones:any;
  public personas:any;

  constructor(
    private back: BackService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    const navegation = this.router.getCurrentNavigation();
    if (navegation?.extras.state) {
      this.reserva = navegation.extras.state["dato"];
      this.reserva.fechaentrada = this.formatDate(this.reserva.fechaentrada);
      this.reserva.fechasalida = this.formatDate(this.reserva.fechasalida);
    }
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
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

  editarReserva(){
    this.back.editarReserva(this.id,JSON.stringify(this.reserva)).subscribe(resp=>{
      this.cancelar();
    });
  }

  cancelar(){
    this.router.navigate(['../'],{relativeTo: this.activatedRoute});
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses son 0-indexados
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
