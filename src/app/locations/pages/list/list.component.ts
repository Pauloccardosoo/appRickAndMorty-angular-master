import { Component, OnInit, inject, HostListener } from '@angular/core';
import { LocationsService } from '../../services/locations.service';
import { Location } from '../../interfaces/locations-response';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  private _locationService = inject(LocationsService);
  private _activatedRoute = inject(ActivatedRoute);
  public locations: Location[] = [];
  public isLoading = true; // Start as true
  public mensaje = 'Carregando lista dos lugares...'; // Initial message
  public totalPages = 0;
  private _nextPage = 1;
  public searchTerm: string = '';

  ngOnInit(): void {
    this._activatedRoute.queryParams
      .pipe(
        switchMap( ({ search = '' }) => {
          this.locations = [];
          this.searchTerm = search;
          this.isLoading = true; // Set loading true before API call
          // Reset list and pagination for new search
          this._nextPage = 1;
          this.totalPages = 0;
          this.mensaje = 'Carregando lista dos lugares...';
          return this._locationService.obtenerPaginado(1, search); // Initial load with search term
        })
      )
      .subscribe({ // Use object observer
        next: (resp) => {
          // Ensure results and info exist before accessing them
          this.locations = resp?.results || [];
          this.totalPages = resp?.info?.pages || 0;
          // Determine next page based on API response
          this._nextPage = resp?.info?.next ? 2 : 1;
          // Handle single page or no results case for nextPage correctly
          if (this.totalPages <= 1) {
             this._nextPage = this.totalPages + 1; // Prevent loading more if only one page
          }

          // Update message based on results
          if (this.locations.length === 0) {
            this.mensaje = 'Nenhum lugar encontrado.';
          } else if (this._nextPage > this.totalPages) {
            this.mensaje = 'Todos os lugares foram carregados.';
          } else {
            this.mensaje = ''; // Clear message
          }
          this.isLoading = false; // Set loading false after processing results
        },
        error: (err) => {
          console.error('Erro ao carregar localizações iniciais:', err);
          this.mensaje = 'Erro ao carregar localizações.';
          this.locations = [];
          this.totalPages = 0;
          this.isLoading = false; // Ensure isLoading is false on error
        }
      });
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Added a small buffer to trigger loading slightly before reaching the absolute bottom
    const buffer = 100;
    // Check isLoading, if nextPage is valid
    if (!this.isLoading && this._nextPage <= this.totalPages && (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - buffer)) {
      this.loadLocations();
    }
  }

  loadLocations() {
    if (this.isLoading) return;
  
    this.isLoading = true;
    this._locationService.obtenerPaginado(this._nextPage, this.searchTerm).subscribe({
      next: (resp) => {
        this.locations = [...this.locations, ...resp.results]; // Adiciona os novos aos antigos
        this.totalPages = resp.info.pages;
        this._nextPage++;
        this.isLoading = false;
  
        // Atualiza mensagem caso tenha carregado tudo
        if (this._nextPage > this.totalPages) {
          this.mensaje = 'Todos os lugares foram carregados.';
        }
      },
      error: (err) => {
        console.error('Erro ao carregar localizações:', err);
        this.isLoading = false;
        this.mensaje = 'Erro ao carregar os lugares.';
      }
    });
  }
  
}
