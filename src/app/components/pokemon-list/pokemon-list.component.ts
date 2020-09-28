import { environment } from './../../../environments/environment.prod';
import { PokemonService } from './../../services/pokemon.service';
import { Pokemon } from './../../classes/Pokemon/pokemon';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router';

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
  subscription: Subscription;
  querySubscription: Subscription;
  currentPage: number;

  pokemonSearchParameter: string;
  requestSearch: string;
  pokemonSearchResponse: Pokemon[];

  readonly offsetConstant: number = 20;

  constructor(private route: ActivatedRoute, private router: Router, private service: PokemonService) { 
    this.isLoading = true;
    this.currentOffset = 0;
  }
  
  ngOnInit() {
    this.isLoading = true;

    this.querySubscription = this.getCurrentPage();

    this.subscription = this.loadPokemons();   
  } 

  loadPokemons(){
    return this.service.getPokemonList(this.currentOffset)
      .pipe(
        map((response : any) => {
          this.pokemons = response['results']
          this.count = parseInt(response['count'])
        })
      )
      .subscribe(list => {
        //if the user tries to access manually a page that is out of range, send him to the 
        //last page (if the page user tries to access is higher than the last page) or the
        //first page (is it is lower than the first page)
        if(this.currentPage > this.count/this.offsetConstant){
          this.sendToLastPage();
        }
        if(this.currentPage < 0){
          this.sendToFirstPage();
        }

        //if the page is within the possible bounds, load the pokémons from that page
        else{
          for(let pokemon of this.pokemons){
            pokemon.id = this.getPokemonId(pokemon.url)
            pokemon.image = `${environment.DEFAULT_IMAGE}${pokemon.id}.png`
          }
          this.isLoading = false;
        }
      });
  }

  getPokemonSearchParameter(event){
    this.pokemonSearchParameter = event
    console.log("Received: " + this.pokemonSearchParameter)
    this.searchPokemon()
  }

  searchPokemon(){
    this.router.navigate(['/pokemon'], {queryParams: {search: this.pokemonSearchParameter}});
    let search = this.service.getPokemonSearch()
      .pipe(
        map((response : any) => {
          this.pokemons = response['results']
          this.count = parseInt(response['count'])
          console.log(this.pokemons)
        })
      )
      .subscribe(res =>{
        this.pokemons = this.pokemons.filter(pokemon => pokemon.name.includes(this.pokemonSearchParameter))
        for(let pokemon of this.pokemons){
          pokemon.id = this.getPokemonId(pokemon.url)
          pokemon.image = `${environment.DEFAULT_IMAGE}${pokemon.id}.png`
        }
        console.log(this.pokemons)
      })
  }

  getCurrentPage(){
    return this.route.queryParams.subscribe(queryParams => {

      //if the user types /pokemon on the url we send him/her to the first page of the pokémon list
      if(Object.keys(queryParams).length === 0){
        this.currentPage = 0;
        this.router.navigate(['/pokemon'], {queryParams: {page: this.currentPage}});
      }

      this.currentPage = parseInt(queryParams['page'])
  
      this.currentOffset = this.currentPage*this.offsetConstant;
    })
  }

  getNextPage(){
    this.isLoading = true;
    this.currentPage++;
    this.currentOffset = this.currentPage*this.offsetConstant;
    if(this.currentOffset > this.count){
      return
    }
    this.router.navigate(['/pokemon'], {queryParams: {page: this.currentPage}}); 

    this.subscription = this.loadPokemons();
  }

  getPreviousPage(){
    this.currentPage--;
    this.currentOffset = this.currentPage*this.offsetConstant;
    if(this.currentOffset < 0){
      return
    }
    this.router.navigate(['/pokemon'], {queryParams: {page: this.currentPage}}); 
    this.isLoading = true;

    this.subscription = this.loadPokemons();
  }

  sendToLastPage(){
    this.currentPage = Math.floor(this.count/this.offsetConstant);
    this.currentOffset = this.currentPage*this.offsetConstant;
    console.log('Offset: ' + this.currentOffset + ' Page: ' + this.currentPage)
    this.subscription = this.loadPokemons();
    this.router.navigate(['/pokemon'], {queryParams: {page: this.currentPage}});
  }

  sendToFirstPage(){
    this.currentPage = 0;
    this.currentOffset = this.currentPage*this.offsetConstant;
    this.subscription = this.loadPokemons();
    this.router.navigate(['/pokemon'], {queryParams: {page: this.currentPage}});
  }

  getPokemonId(url: string){
    // https://pokeapi.co/api/v2/pokemon/id/
    let id = url.slice(34).slice(0, -1)
    return parseInt(id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.querySubscription.unsubscribe();
  }
  
}