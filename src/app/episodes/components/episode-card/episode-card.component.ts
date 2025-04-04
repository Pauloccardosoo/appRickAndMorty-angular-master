import { Component, Input } from '@angular/core';
import { Episode } from '../../interfaces/episodes-response';

@Component({
  selector: 'app-episodes-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.css'],
})
export class EpisodeCardComponent {
  @Input()
  episode!: Episode;
}
