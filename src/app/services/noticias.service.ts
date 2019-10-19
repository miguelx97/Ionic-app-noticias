import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;
  categoriaActual='';
  categoriaPage=0;


  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string){
    //https://newsapi.org/v2/top-headlines?country=gb&apiKey=ad139d2f1ff44d528eb44bbe77e5889a
    query = apiUrl + query;
    return this.http.get<T>(query, {headers});
  }

  getTopHeadlines(){
    this.headlinesPage ++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=gb&page=${ this.headlinesPage }`)
  }

  getTopHeadlinesCategoria(categoria: string){
    if(this.categoriaActual === categoria){
      this.categoriaPage++;
    } else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    console.log('categoriaActual', this.categoriaActual)
    console.log('categoriaPage', this.categoriaPage)
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=gb&category=${categoria}&page=${this.categoriaPage}`)
  }
}
