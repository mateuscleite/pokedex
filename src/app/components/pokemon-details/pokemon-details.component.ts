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

  constructor(private route: ActivatedRoute, private service: PokemonService) { 
    this.pokemon = new Pokemon();
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: any) => {
      this.pokemon.id = params['id']
      this.service.getPokemonDetails(this.pokemon.id).pipe(
        map((response: any) => {
          this.pokemon.name = response['name'];
          this.pokemon.image = `${environment.DEFAULT_IMAGE}${this.pokemon.id}.png`
          this.pokemon.type = response['types']
          this.pokemon.stats = response['stats']
          console.log(this.pokemon)
        })
      )
      .subscribe()
    })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
