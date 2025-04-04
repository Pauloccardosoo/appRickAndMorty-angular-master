import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CharactersRoutingModule } from './characters-routing.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SharedModule } from '../shared/shared/shared.module';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharacterPageComponent } from './pages/character-page/character-page.component';
import { CharactersLayoutComponent } from './layout/characters-layout/characters-layout.component';
import { EspeciePipe } from './pipes/especie.pipe';

@NgModule({
  declarations: [
    ListPageComponent,
    CharacterCardComponent,
    CharacterPageComponent,
    EspeciePipe,
  ],
  imports: [CommonModule, CharactersRoutingModule, SharedModule, FormsModule, CharactersLayoutComponent],
  exports: [
  ]
})
export class CharactersModule {}
