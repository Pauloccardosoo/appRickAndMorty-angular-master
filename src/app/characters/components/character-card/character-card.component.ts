import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../../interfaces/characters-response';
import { FavoritesService } from '../../../shared/services/favorites.service'; // Importar o serviço

@Component({
  selector: 'app-characters-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css'],
})
export class CharacterCardComponent implements OnInit {
  @Input() character!: Character; // Usar ! para indicar que será inicializado via @Input
  isFavorite: boolean = false;

  // Injetar o FavoritesService
  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    if (this.character) {
      this.isFavorite = this.favoritesService.isFavorite(this.character.id, 'character');
    }
  }

  // Método para alternar o status de favorito
  toggleFavorite(): void {
    if (this.character) {
      this.favoritesService.toggleFavorite(this.character.id, 'character');
      this.isFavorite = this.favoritesService.isFavorite(this.character.id, 'character'); // Atualiza o status localmente
    }
  }
}
