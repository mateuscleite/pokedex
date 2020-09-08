import { Pokemon } from './../interfaces/pokemon'
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly API = `${environment.API}pokemon`;

  private pokemonList: any;

  constructor(private http: HttpClient) {  }

  getPokemonList(){
    return this.http.get(this.API);
  }
}
