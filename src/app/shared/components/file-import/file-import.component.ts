import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-file-import',
  templateUrl: './file-import.component.html',
  styleUrls: ['./file-import.component.css']
})
export class FileImportComponent {

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  @Output() onFile = new EventEmitter<File>();

  constructor() { }

  openFileSelector() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0] as File;

    if (file) {
      this.onFile.emit(file);
      // Lire le fichier ou traiter le fichier sélectionné
    }
  }

}
