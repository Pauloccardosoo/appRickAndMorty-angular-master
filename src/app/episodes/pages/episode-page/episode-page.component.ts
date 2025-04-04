import { Component, OnInit, inject } from '@angular/core';
import { EpisodesService } from '../../services/episodes.service';
import { Episode } from '../../interfaces/episodes-response';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './episode-page.component.html',
  styleUrls: ['./episode-page.component.css'],
})
export class EpisodePageComponent implements OnInit {
  private _episodeService = inject(EpisodesService);
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  public episode?: Episode;
  public isLoading = true;
  ngOnInit(): void {
    const episodeId = this._activatedRoute.snapshot.params['id'];
    // console.log({ Params: this._activatedRoute.snapshot.url[1].path });//*Otra forma de obtener el id
    if (!episodeId) {
      this._router.navigate(['/episodes/']); //!devolver el usuario a la lista de episodes
      return;
    }
    this.isLoading = true;
    this._episodeService.getEpisode(episodeId).subscribe({
      next: (episode) => {
        console.log(episode);
        setTimeout(() => {
          this.episode = episode;
          this.isLoading = false;
        }, 2200);
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      },
    });
  }
}
