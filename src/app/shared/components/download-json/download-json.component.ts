import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-download-json',
  templateUrl: './download-json.component.html',
  styleUrls: ['./download-json.component.css']
})
export class DownloadJsonComponent {
  @Output() download = new EventEmitter<void>();
  constructor() { }

  onDownloadClick() {
    this.download.emit();
  }

}
