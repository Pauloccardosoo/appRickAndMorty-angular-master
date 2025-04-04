import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationsResponse } from '../interfaces/locations-response';
import { environment } from 'src/app/environments/environment';
import { LocationResponse } from '../interfaces/location-response';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private _http = inject(HttpClient);
  private _baseUrl = environment.apiUrl;

  constructor() {}

  obtenerTodos(): Observable<LocationsResponse> {
    return this._http.get<LocationsResponse>(`${this._baseUrl}location`);
  }

  obtenerPorId(id: number): Observable<LocationResponse> {
    return this._http.get<LocationResponse>(`${this._baseUrl}location/${id}`);
  }
  obtenerPaginado(pagina: number, searchTerm: string = ''): Observable<LocationsResponse> {
    let params = new HttpParams().set('page', pagina.toString());
    if (searchTerm) {
      params = params.set('name', searchTerm);
    }
    return this._http.get<LocationsResponse>(`${this._baseUrl}location`, { params });
  }
}
