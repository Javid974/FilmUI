import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearSelectComponent } from './components/year-select/year-select.component';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { FileImportComponent } from './components/file-import/file-import.component';
import { DownloadJsonComponent } from './components/download-json/download-json.component';

@NgModule({
  declarations: [YearSelectComponent, ConfirmationDialogComponent, FileImportComponent, DownloadJsonComponent],
  imports: [CommonModule, FormsModule],
  exports: [YearSelectComponent, ConfirmationDialogComponent, FileImportComponent, DownloadJsonComponent],
})
export class SharedModule { }
