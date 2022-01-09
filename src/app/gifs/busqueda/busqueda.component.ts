import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {


  // event:KeyboardEvent
  @ViewChild('txtBuscar') txtBuscar! : ElementRef<HTMLInputElement>;  //busca en el html el elemento por la referencia local que se le puso al objeto #txtBuscar y se lo asigna al otrao elmento
 
  constructor (private gifService : GifsService){}
  
  buscar(){ 

    const value = this.txtBuscar.nativeElement.value;
    //console.log(value);

    if ( value.trim().length === 0){return } 
    this.gifService.buscarGifs(value);
    this.txtBuscar.nativeElement.value='';
  }

}
