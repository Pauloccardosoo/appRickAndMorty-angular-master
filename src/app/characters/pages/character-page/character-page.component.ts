import { Component, OnInit, inject } from '@angular/core';
import { Character } from '../../interfaces/characters-response';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from '../../services/characters.service';
import { switchMap } from 'rxjs';

@Component({
  templateUrl: './character-page.component.html',
})
export class CharacterPageComponent implements OnInit {
  private _activeRoute = inject(ActivatedRoute);
  private _characterService = inject(CharactersService);
  private _route = inject(Router);
  public character?: Character;
  public isLoading = true;
  public mensaje = 'Carregando dados do personagem\n';
  ngOnInit(): void {
    this._activeRoute.params
      .pipe(switchMap(({ id }) => this._characterService.getCharacterById(id)))
      .subscribe((character) => {
        if (!character) {
          return this._route.navigate(['/characters/list']);
        }
        this.mensaje += `\n \n ${character.name}`;
        setTimeout(() => {
          this.character = character;
          this.isLoading = false;
        }, 1500);
        return;
      });
  }
}
