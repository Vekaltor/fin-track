import {AsyncPipe} from '@angular/common';
import {Component, inject, signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppLabeledField} from '@shared/components/ui/app-labeled-field/app-labeled-field';
import {SettlementsFacade} from '../../store/settlements.facade';
import {FormActions} from '../ui/form-actions/form-actions';

@Component({
  selector: 'app-new-group-form',
  imports: [AsyncPipe, FormsModule, AppLabeledField, FormActions],
  templateUrl: './new-group-form.html',
})
export class NewGroupForm {
  protected readonly facade: SettlementsFacade = inject(SettlementsFacade);

  protected readonly groupName: WritableSignal<string> = signal('');

  protected onCancel(): void {
    this.groupName.set('');
    this.facade.hideNewGroupForm();
  }

  protected onSubmit(): void {
    const name: string = this.groupName().trim();
    if (!name) {
      return;
    }
    this.facade.createGroup({name});
    this.groupName.set('');
  }
}
