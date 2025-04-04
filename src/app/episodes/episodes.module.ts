import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodesRoutingModule } from './episodes-routing.module';
import { RouterModule } from '@angular/router';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SharedModule } from '../shared/shared/shared.module';
import { EpisodePageComponent } from './pages/episode-page/episode-page.component';
import { EpisodeCardComponent } from './components/episode-card/episode-card.component';

@NgModule({
  declarations: [ListPageComponent, EpisodePageComponent, EpisodeCardComponent],
  imports: [CommonModule, EpisodesRoutingModule, SharedModule],
})
export class EpisodesModule {}
