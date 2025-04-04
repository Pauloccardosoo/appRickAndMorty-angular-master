import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationsService } from '../../services/locations.service';
import { Location } from '../../interfaces/locations-response';

@Component({
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  private _route = inject(Router);
  private _activeRoute = inject(ActivatedRoute);
  private _locationsService = inject(LocationsService);
  isLoading = true;
  mensaje = 'Satélite rastreando o mundo...';
  location?: Location;

  ngOnInit(): void {
    const id = this._activeRoute.snapshot.paramMap.get('id');
    this._locationsService.obtenerPorId(Number.parseInt(id!)).subscribe((x) => {
      if (x.id > 0) {
        this.location = x;
        setTimeout(() => {
          this.isLoading = false;
        }, 1200);
      } else {
        this._route.navigate(['/locations']);
      }
    });
  }
}
