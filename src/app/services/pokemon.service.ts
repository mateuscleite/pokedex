import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly API = environment.API;
  private readonly limit = 20;

  constructor(private http: HttpClient) {  }

  getPokemonList(offset: number){
    return this.http.get(`${this.API}pokemon?offset=${offset}&limit=${this.limit}`);
  }

  getPokemonDetails(id: number){
    return this.http.get(`${this.API}pokemon/${id}`)
  }

}
