import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root' // Fornecido globalmente na aplicação
})
export class FavoritesService {

  private readonly STORAGE_KEY = 'favorites';
  private username: string | null = null;
  private userSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.username = user;
    });
  }

  private getStorageKey(): string {
    return `favorites_${this.username}`;
  }

  /**
   * Obtém a lista de favoritos do localStorage.
   * Retorna um array vazio se o localStorage não existir ou estiver mal formatado.
   */
  getFavorites(): string[] {
    const storageValue = localStorage.getItem(this.getStorageKey());
    if (!storageValue) {
      return [];
    }
    try {
      const favorites = JSON.parse(storageValue);
      // Garante que seja um array de strings
      if (Array.isArray(favorites) && favorites.every(item => typeof item === 'string')) {
        return favorites;
      }
      return []; // Retorna vazio se o formato for inválido
    } catch (error) {
      console.error('Erro ao parsear localStorage de favoritos:', error);
      localStorage.removeItem(this.getStorageKey()); // Limpa localStorage inválido
      return [];
    }
  }

  /**
   * Adiciona um item aos favoritos.
   * @param id O ID do item a ser adicionado.
   * @param type O tipo do item ('character', 'episode', 'location').
   */
  addFavorite(id: number, type: 'character' | 'episode' | 'location'): void {
    const favorites = this.getFavorites();
    const favoriteId = `${type[0]}${id}`; // Ex: c123, e456, l789
    if (!favorites.includes(favoriteId)) {
      favorites.push(favoriteId);
      this.saveFavorites(favorites);
    }
  }

  /**
   * Remove um item dos favoritos.
   * @param id O ID do item a ser removido.
   * @param type O tipo do item ('character', 'episode', 'location').
   */
  removeFavorite(id: number, type: 'character' | 'episode' | 'location'): void {
    let favorites = this.getFavorites();
    const favoriteId = `${type[0]}${id}`;
    favorites = favorites.filter(favId => favId !== favoriteId);
    this.saveFavorites(favorites);
  }

  /**
   * Verifica se um item está na lista de favoritos.
   * @param id O ID do item a ser verificado.
   * @param type O tipo do item ('character', 'episode', 'location').
   * @returns true se o item for favorito, false caso contrário.
   */
  isFavorite(id: number, type: 'character' | 'episode' | 'location'): boolean {
    const favorites = this.getFavorites();
    const favoriteId = `${type[0]}${id}`;
    return favorites.includes(favoriteId);
  }

  /**
   * Salva a lista de favoritos no localStorage.
   * @param favorites Array de IDs de favoritos.
   */
  private saveFavorites(favorites: string[]): void {
    localStorage.setItem(this.getStorageKey(), JSON.stringify(favorites));
  }

  /**
   * Alterna o status de favorito de um item.
   * Adiciona se não for favorito, remove se for.
   * @param id O ID do item.
   * @param type O tipo do item ('character', 'episode', 'location').
   */
  toggleFavorite(id: number, type: 'character' | 'episode' | 'location'): void {
    if (this.isFavorite(id, type)) {
      this.removeFavorite(id, type);
    } else {
      this.addFavorite(id, type);
    }
  }
}
