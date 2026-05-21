import {AsyncPipe} from '@angular/common';
import {Component, inject, model, ModelSignal, output, OutputEmitterRef} from '@angular/core';
import {form, required, submit} from '@angular/forms/signals';
import {CreateGroupPayload} from '@core/models/create-group-payload.interface';
import {TextField} from '@shared/components/forms/text-field/text-field';
import {SettlementsFacade} from '../../store/settlements.facade';
import {FormActions} from '../ui/form-actions/form-actions';

interface NewGroupFormModel {
  readonly name: string;
}

@Component({
  selector: 'app-new-group-form',
  imports: [AsyncPipe, TextField, FormActions],
  templateUrl: './new-group-form.html',
})
export class NewGroupForm {
  protected readonly facade: SettlementsFacade = inject(SettlementsFacade);

  public readonly created: OutputEmitterRef<void> = output<void>();

  protected readonly formModel: ModelSignal<NewGroupFormModel> = model<NewGroupFormModel>({
    name: '',
  });

  protected readonly groupForm = form(this.formModel, (schema): void => {
    required(schema.name, {message: 'Nazwa grupy jest wymagana'});
  });

  protected onCancel(): void {
    this.formModel.set({name: ''});
    this.facade.hideNewGroupForm();
  }

  protected handleSubmit(event: SubmitEvent): void {
    event.preventDefault();
    this.groupForm().markAsTouched();
    void submit(this.groupForm, {
      action: async (instance): Promise<void> => {
        const name: string = instance.name().value().trim();
        if (!name) {
          return;
        }
        this.facade.createGroup({name} satisfies CreateGroupPayload);
        this.formModel.set({name: ''});
      },
    });
  }
}
