import { Component, inject } from '@angular/core';
import { SearchService } from './shared/services/search.service';
import { Router } from '@angular/router';
import { Character } from './characters/interfaces/characters-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appRickandMorty';
  searchResults: any;
  private searchService = inject(SearchService);
  private router = inject(Router);

  constructor() {
    this.searchService.searchTerm$.subscribe(searchResult => {
      this.searchResults = searchResult;
    });
  }

  goToCharacter(character: Character) {
    this.router.navigate(['/characters/detalle', character.id]);
  }
}
