import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './characters-layout.component.html',
  styleUrls: ['./characters-layout.component.css'],
})
export class CharactersLayoutComponent {}
