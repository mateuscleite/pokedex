import { Pokemon } from './../../classes/Pokemon/pokemon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  pokemon: Pokemon = new Pokemon(132, "ditto", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png");

  constructor() { 
    this.pokemon.id = 132;
    this.pokemon.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
    this.pokemon.name = "ditto"
  }

  ngOnInit(): void {
  }

}
