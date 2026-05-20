import {Component, inject, Signal} from '@angular/core';
import {ModalService} from '@shared/services/modal.service';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './app-modal.html',
})
export class AppModal {
  private readonly modalService: ModalService = inject(ModalService);

  protected readonly isOpen: Signal<boolean> = this.modalService.isOpen;

  protected onBackdropClick(): void {
    this.modalService.canCloseOnBackdrop() && this.modalService.close();
  }
}
