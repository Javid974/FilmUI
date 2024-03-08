import { Component } from '@angular/core';
import { MoviesService } from 'src/services/movies.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent {
  public errorMessage: string = '';
  public message: string = '';
  public isUploading: boolean = false;
  selectedFile: File | null = null;
  fileName = 'Choisir un fichier...';
  constructor(private movieService: MoviesService) { }
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0] as File;

    if (file) {
      this.selectedFile = file;
      const extension = file.name.split('.').pop();
      this.fileName = file.name;

      if (extension === 'xls' || extension === 'xlsx') {
        this.isUploading = true;
        this.selectedFile = file;
        this.movieService.uploadFile(this.selectedFile).subscribe({
          next: (response) => {
            this.message = response.message;
            this.errorMessage = '';
            this.isUploading = false;
            target.value = '';
          },
          error: (err) => {
            this.isUploading = false;
            this.errorMessage = err;
            target.value = '';
          },
        });
      } else {
        this.errorMessage = 'Le fichier doit être de type Excel';
      }
    }
  }
}
