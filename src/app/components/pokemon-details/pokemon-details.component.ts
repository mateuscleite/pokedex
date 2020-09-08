import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../classes/Pokemon/pokemon';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  pokemon: Pokemon;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private service: PokemonService) { 
    this.pokemon = new Pokemon();
    console.log(this.pokemon)
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: any) => {
      this.pokemon.id = params['id']
    })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
