import {
  Component,
  Output,
  EventEmitter,
  TemplateRef,
  Input,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent {
  @Output() confirmed = new EventEmitter<void>();
  @Input() mode: string = 'movieMode';

  modalRef!: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    this.confirmed.emit();
    this.modalRef.hide();
  }
}
