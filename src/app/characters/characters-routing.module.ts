import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersLayoutComponent } from './layout/characters-layout/characters-layout.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { CharacterPageComponent } from './pages/character-page/character-page.component';

const routes: Routes = [
  {
    path: '',
    component: CharactersLayoutComponent,
    children: [
      {
        path: '',
        component: ListPageComponent,
      },
      {
        path: 'detalle/:id',
        component: CharacterPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersRoutingModule {}
