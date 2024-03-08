import { Component, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { Subject, takeUntil } from 'rxjs';
import { directorMoviesCount } from 'src/models/directorMoviesCount';
import { StatisticsService } from 'src/services/statistics.service';

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.css'],
})
export class DirectorsComponent implements OnInit {
  directorsMoviesCount: Array<directorMoviesCount> = [];

  private destroyed$ = new Subject();
  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.getDirectorMoviesCount();
  }

  getDirectorMoviesCount(): void {
    this.statisticsService
      .getDirectorMoviesCount()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((directorMoviesCount) => {
        this.directorsMoviesCount = directorMoviesCount;
      });
  }

  handleDownload() {
    this.statisticsService.downloadFile().subscribe({
      next: (blob: any) => {
        saveAs(blob, 'directors.json');
      },
      error: (err) => {
        console.error('Erreur lors du téléchargement du fichier:', err);
      },
    });
  }

  onFileSelected(file: File): void {
    // console.log('Fichier reçu:', file);
    this.statisticsService.importFile(file).subscribe({
      next: (response: any) => {
        console.log('Réponse du serveur:', response);
        toastr.success('Realistateurs correctement sauvegardé!', '', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      },
      error: (err) => {
        console.error('Erreur lors de l\'import du fichier:', err);
      },
    });
  }
}
