import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root' 
  //'root' da un accesso global de este servicio
})
export class GifsService {

  private apiKey : string = '6QbtnGC6EhpV5MYL4t08s7TyNlZ4tAE8';
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs';

  private _historial : string [] = [];

  public resultados : Gif [] =[];

  get historial(){
    //solo 11 valores
    return [...this._historial];
  }
  
  constructor ( private http : HttpClient ){

    //tambien se puede escribir asi
    // this._historial = JSON.parse( localStorage.getItem('Historial')! ) || [];

    if(localStorage.getItem('Historial')){
      this._historial = JSON.parse( localStorage.getItem('Historial')! );
    }
    this.resultados = JSON.parse(localStorage.getItem('currSearch')!) || [];
  }

  buscarGifs( query : string ){
    
    query= query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift( query);
      this._historial = this._historial.splice(0,10); 

      localStorage.setItem('Historial',JSON.stringify( this._historial ));
    
    }

    
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '16')
      .set('q', query);

    // FETCH - JAVASCRIPT
    //se puede hacer asi pero vammos a usar la otra forma
    // para que funcione es necesario agregar async al metodo [[[      async buscarGifs( query : string )  ]]]]
    //  const respuesta = await fetch ('https://api.giphy.com/v1/gifs/search?api_key=6QbtnGC6EhpV5MYL4t08s7TyNlZ4tAE8&q=hi&limit=10');
    //  const data = await respuesta.json();
    //  console.log(data);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{ params } )
    .subscribe( (resp) => {
     // console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('currSearch', JSON.stringify( this.resultados ));
    });

    //console.log(this._historial);

  }
}
