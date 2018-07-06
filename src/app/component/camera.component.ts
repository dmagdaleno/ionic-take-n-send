import {Component, Input} from '@angular/core';

@Component({
  selector: 'camera',
  templateUrl: './camera.component.html'
})
export class CameraComponent {
  @Input() titulo;
  @Input() url;
}