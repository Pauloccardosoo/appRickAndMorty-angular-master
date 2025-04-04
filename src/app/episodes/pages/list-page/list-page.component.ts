import { Component, OnInit, inject, HostListener } from '@angular/core';
import { Episode } from '../../interfaces/episodes-response';
import { EpisodesService } from '../../services/episodes.service';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
})
export class ListPageComponent implements OnInit {
  private _episodesService = inject(EpisodesService);
  private _activatedRoute = inject(ActivatedRoute);
  mensaje = 'Carregando a lista de episódios...'; // Corrected typo
  episodesList: Episode[] = [];
  isLoading = true;
  totalPages = 0;
  private _nextPage = 1;
  searchTerm: string = '';

  ngOnInit(): void {
    this._activatedRoute.queryParams
    .pipe(
      switchMap( ({ search = '' }) => {
        this.episodesList = [];
        this.searchTerm = search;
        this.isLoading = true;
        return this._episodesService.getEpisodes(1, search);
      })
    )
    .subscribe( episodes => {
      this.episodesList = episodes.results;
      this.totalPages = episodes.info.pages;
      this._nextPage = 2;
      this.isLoading = false;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Added a small buffer
    const buffer = 100;
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - buffer) && !this.isLoading && this._nextPage <= this.totalPages) {
      this.loadEpisodes();
    }
  }

  loadEpisodes() {
    if (this.isLoading) return;

    this.isLoading = true;
    this._episodesService.getEpisodes(this._nextPage, this.searchTerm).subscribe({
      next: (resp) => {
        this.episodesList = [...this.episodesList, ...resp.results];
        this.totalPages = resp.info.pages;
        this._nextPage++;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar episódios:', err);
        this.isLoading = false;
      }
    });
  }
}
