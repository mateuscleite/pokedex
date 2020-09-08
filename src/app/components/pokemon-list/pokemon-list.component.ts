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
  isLoading: boolean;
  currentOffset: number;
  count: number;

  readonly offsetConstant: number = 20;

  constructor(private service: PokemonService) { 
    this.isLoading = true;
    this.currentOffset = 0;
  }
  
  ngOnInit() {
    this.isLoading = true;
    this.service.getPokemonList(this.currentOffset)
      .pipe(
        map((response : any) => {
          this.pokemons = response.results
          this.count = response.count
        })
      )
      .toPromise()
      .then(list => {
        for(let pokemon of this.pokemons){
          pokemon.id = this.getPokemonId(pokemon.url)
          pokemon.image = `${environment.DEFAULT_IMAGE}${pokemon.id}.png`
        }
        this.isLoading = false;
      })    
  } 

  getNextPage(){
    this.isLoading = true;
    if(this.currentOffset > this.count){
      return
    }
    this.currentOffset = this.currentOffset + this.offsetConstant;
    this.service.getPokemonList(this.currentOffset)
      .pipe(
        map((response : any) => this.pokemons = response.results)
      )
      .toPromise()
      .then(list => {
        for(let pokemon of this.pokemons){
          pokemon.id = this.getPokemonId(pokemon.url)
          pokemon.image = `${environment.DEFAULT_IMAGE}${pokemon.id}.png`
        }
        this.isLoading = false;
      }) 
  }

  getPreviousPage(){
    if(this.currentOffset == 0){
      return
    }
    this.isLoading = true;
    this.currentOffset -= this.offsetConstant;
    this.service.getPokemonList(this.currentOffset)
      .pipe(
        map((response : any) => this.pokemons = response.results)
      )
      .toPromise()
      .then(list => {
        for(let pokemon of this.pokemons){
          pokemon.id = this.getPokemonId(pokemon.url)
          pokemon.image = `${environment.DEFAULT_IMAGE}${pokemon.id}.png`
        }
        this.isLoading = false;
      }) 
  }

  getPokemonId(url: string){
    // https://pokeapi.co/api/v2/pokemon/id/
    let id = url.slice(34).slice(0, -1)
    return parseInt(id);
  }
}