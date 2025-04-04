import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './characters/pages/list-page/list-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  // Rota para o módulo de autenticação (lazy loaded)
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'characters',
    loadChildren: () =>
      import('./characters/characters.module').then((m) => m.CharactersModule),
  },
  {
    path: 'episodes',
    loadChildren: () =>
      import('./episodes/episodes.module').then((m) => m.EpisodesModule),
  },
  {
    path: 'locations',
    loadChildren: () =>
      import('./locations/locations.module').then((m) => m.LocationsModule),
  },
  {
    path: '**',
    component: ListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
