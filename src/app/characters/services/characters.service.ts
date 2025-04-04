import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  Character,
  CharactersResponse,
} from '../interfaces/characters-response';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private _http = inject(HttpClient);
  private _baseUrl = environment.apiUrl;
  constructor() {}

  // Método atualizado para aceitar filtro e paginação
  getCharacters(page: number = 1, nameFilter?: string): Observable<CharactersResponse> {
    let params = new HttpParams().set('page', page.toString());

    if (nameFilter) {
      params = params.set('name', nameFilter);
    }

    return this._http.get<CharactersResponse>(`${this._baseUrl}/character`, { params });
  }

  getCharacterById(id: number): Observable<Character> {
    return this._http.get<Character>(`${this._baseUrl}/character/${id}`);
  }
}
