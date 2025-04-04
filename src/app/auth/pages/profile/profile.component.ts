import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FavoritesService } from '../../../shared/services/favorites.service';
import { CharactersService } from '../../../characters/services/characters.service';
import { Character } from '../../../characters/interfaces/characters-response';
import { Subscription, forkJoin, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  username: string | null = null;
  favoriteCharacters: Character[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  private userSubscription: Subscription | undefined;
  private favoritesSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private favoritesService: FavoritesService,
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.errorMessage = null;

    // 1. Obter o nome do usuário logado
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.username = user;
    });

    // 2. Obter IDs dos favoritos e buscar detalhes
    const favoriteIds = this.favoritesService.getFavorites();

    if (favoriteIds.length > 0) {
      // Criar um array de Observables, um para cada chamada de getCharacterById
      const characterObservables = favoriteIds.map(id =>
        this.charactersService.getCharacterById(Number(id.substring(1))).pipe(
          catchError(error => {
            console.error(`Erro ao buscar personagem com ID ${id}:`, error);
            // Retorna um Observable vazio ou com um valor nulo/erro tratado para não quebrar o forkJoin
            return of(null); // Ou um objeto de erro específico
          })
        )
      );

      // Usar forkJoin para esperar todas as chamadas terminarem
      this.favoritesSubscription = forkJoin(characterObservables).subscribe({
        next: (characters) => {
          // Filtra quaisquer resultados nulos (devido a erros)
          this.favoriteCharacters = characters.filter(char => char !== null) as Character[];
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao buscar detalhes dos personagens favoritos:', error);
          this.errorMessage = 'Não foi possível carregar os personagens favoritos.';
          this.isLoading = false;
        }
      });
    } else {
      // Nenhum favorito, apenas termina o carregamento
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    // Cancelar inscrições para evitar memory leaks
    this.userSubscription?.unsubscribe();
    this.favoritesSubscription?.unsubscribe();
  }

  // Método para remover favorito diretamente do perfil (opcional)
  removeFavorite(characterId: number): void {
    this.favoritesService.removeFavorite(characterId, 'character');
    // Atualiza a lista localmente
    this.favoriteCharacters = this.favoriteCharacters.filter(char => char.id !== characterId);
  }

  logout(): void {
    this.authService.logout();
  }
}
