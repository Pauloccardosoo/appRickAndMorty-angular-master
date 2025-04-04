import { HttpClient, HttpParams } from '@angular/common/http'; // Importar HttpParams
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Episode, EpisodesResponse } from '../interfaces/episodes-response';

@Injectable({ providedIn: 'root' })
export class EpisodesService {
  private _baseUrl = environment.apiUrl;
  private _http = inject(HttpClient);
  constructor() {}

  // Método atualizado para aceitar filtro e paginação
  getEpisodes(page: number = 1, nameFilter?: string): Observable<EpisodesResponse> {
    let params = new HttpParams().set('page', page.toString());
    if (nameFilter) {
      params = params.set('name', nameFilter); // Adiciona o parâmetro 'nameFilter' se houver filtro
    }
    // Corrigir URL base para incluir '/'
    return this._http.get<EpisodesResponse>(`${this._baseUrl}/episode`, { params });
  }

  getEpisode(id: number): Observable<Episode> {
     // Corrigir URL base para incluir '/'
    return this._http.get<Episode>(`${this._baseUrl}/episode/${id}`);
  }
}
