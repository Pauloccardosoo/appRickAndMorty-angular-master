import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { ListComponent } from './pages/list/list.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { SharedModule } from '../shared/shared/shared.module';
import { LocationComponent } from './components/location/location.component';

@NgModule({
  declarations: [ListComponent, DetalleComponent, LocationComponent],
  imports: [CommonModule, LocationsRoutingModule, SharedModule],
})
export class LocationsModule {}
