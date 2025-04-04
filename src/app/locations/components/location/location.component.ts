import { Component, Input } from '@angular/core';
import { Location } from '../../interfaces/locations-response';

@Component({
  selector: 'app-locations-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent {
  @Input() location!: Location;
}
