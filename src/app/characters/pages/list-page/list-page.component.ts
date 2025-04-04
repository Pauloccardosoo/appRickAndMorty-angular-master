import { Component, OnInit, inject, HostListener } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../interfaces/characters-response';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
})
export class ListPageComponent implements OnInit {
  private _charactersService = inject(CharactersService);
  private _activatedRoute = inject(ActivatedRoute);
  public charactersList: Character[] = [];
  public isLoading = true;
  public mensaje = 'Carregando lista de personagens...';
  public totalPages = 0;
  private _nextPage = 1;
  public searchTerm: string = '';

  ngOnInit(): void {
    this._activatedRoute.queryParams
      .pipe(
        switchMap( ({ search = '' }) => {
          this.charactersList = [];
          this.searchTerm = search;
          this.isLoading = true;
          return this._charactersService.getCharacters(1, search);
        })
      )
      .subscribe( characters => {
        this.charactersList = characters.results;
        this.totalPages = characters.info.pages;
        this._nextPage = 2;
        this.isLoading = false;
      });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Added a small buffer
    const buffer = 100;
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - buffer) && !this.isLoading && this._nextPage <= this.totalPages) {
      this.loadCharacters();
    }
  }

  loadCharacters() {
    if (this.isLoading) return;

    this.isLoading = true;
    this._charactersService.getCharacters(this._nextPage, this.searchTerm).subscribe({
      next: (resp) => {
        this.charactersList = [...this.charactersList, ...resp.results];
        this.totalPages = resp.info.pages;
        this._nextPage++;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar personagens:', err);
        this.isLoading = false;
      }
    });
  }
}
