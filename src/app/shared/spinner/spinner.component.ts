import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  @Input() mensaje?: string;
}
