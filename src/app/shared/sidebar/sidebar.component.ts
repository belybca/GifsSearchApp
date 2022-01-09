import { Component} from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor( private gifService : GifsService){}
  get historial(){
    return this.gifService.historial;
  }

  buscar(query : string){
    return this.gifService.buscarGifs( query );
  } 
  


}
