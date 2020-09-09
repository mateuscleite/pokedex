import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../classes/Pokemon/pokemon';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  pokemon: Pokemon;
  subscription: Subscription;
  isLoading: boolean;

  constructor(private route: ActivatedRoute, private service: PokemonService) { 
    this.pokemon = new Pokemon();
    this.isLoading = true
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.subscription = this.route.params.subscribe((params: any) => {
      this.pokemon.id = params['id']
      this.service.getPokemonDetails(this.pokemon.id).pipe(
        map((response: any) => {
          this.pokemon.name = response['name'];
          this.pokemon.image = `${environment.DEFAULT_IMAGE}${this.pokemon.id}.png`
          this.pokemon.type = response['types']
          this.pokemon.stats = response['stats']
          this.pokemon.weight = response['weight']
          this.pokemon.height = response['height']
          console.log(this.pokemon)
        })
      )
      .subscribe(() => this.isLoading = false)
    })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
