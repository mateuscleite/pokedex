import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { PageDefaultComponent } from './components/page-default/page-default.component';
import { CardComponent } from './components/card/card.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { HomeComponent } from './components/home/home.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { DecimalPipe } from './pipes/decimal.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    PageDefaultComponent,
    CardComponent,
    PokemonListComponent,
    CapitalizePipe,
    HomeComponent,
    PokemonDetailsComponent,
    DecimalPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
