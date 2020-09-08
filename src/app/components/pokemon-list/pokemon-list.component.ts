import { environment } from './../../../environments/environment.prod';
import { PokemonService } from './../../services/pokemon.service';
import { Pokemon } from './../../interfaces/pokemon';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[];

  constructor(private service: PokemonService) { }
  
  ngOnInit() {
    this.service.getPokemonList()
      .toPromise()
      .then(response => this.pokemons = JSON.parse(JSON.stringify(response)).results)
      .then(list => {
        for(let pokemon of this.pokemons){
          pokemon.image= `${environment.DEFAULT_IMAGE}${this.getPokemonId(pokemon.url)}.png`
        }
      })    
  } 

  getPokemonId(url: string){
    // https://pokeapi.co/api/v2/pokemon/id/
    let id = url.slice(34).slice(0, -1)
    return id;
  }
}