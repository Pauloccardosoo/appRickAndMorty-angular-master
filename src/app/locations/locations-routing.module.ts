import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsLayoutComponent } from './layout/locations-layout/locations-layout.component';
import { ListComponent } from './pages/list/list.component';
import { DetalleComponent } from './pages/detalle/detalle.component';

const routes: Routes = [
  {
    path: '',
    component: LocationsLayoutComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'location/:id',
        component: DetalleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationsRoutingModule {}
