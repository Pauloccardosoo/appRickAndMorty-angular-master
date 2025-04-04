import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodesLayoutComponent } from './layout/episodes-layout/episodes-layout.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { EpisodePageComponent } from './pages/episode-page/episode-page.component';

const routes: Routes = [
  {
    path: '',
    component: EpisodesLayoutComponent,
    children: [
      {
        path: '',
        component: ListPageComponent,
      },
      {
        path: 'episode/:id',
        component: EpisodePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpisodesRoutingModule {}
