import {Component, input, InputSignal, output, OutputEmitterRef, signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppLabeledField} from '@shared/components/ui/app-labeled-field/app-labeled-field';
import {ENTRY_DIRECTION_OPTIONS} from '../../constants/entry-direction-labels.constant';
import {CreateEntryPayload} from '@core/models/create-entry-payload.interface';
import {CreateInstallmentPayload} from '@core/models/create-installment-payload.interface';
import {EntryDirection} from '@core/models/entry-direction.enum';
import {AppButton} from '@shared/components/ui/app-button/app-button';
import {AppCheckbox} from '@shared/components/ui/app-checkbox/app-checkbox';
import {FormActions} from '../ui/form-actions/form-actions';
import {SectionTitle} from '../ui/section-title/section-title';

@Component({
  selector: 'app-entry-form',
  imports: [FormsModule, AppLabeledField, AppButton, AppCheckbox, FormActions, SectionTitle],
  templateUrl: './entry-form.html',
})
export class EntryForm {
  public readonly groupId: InputSignal<string> = input.required<string>();
  public readonly groupName: InputSignal<string> = input.required<string>();
  public readonly saving: InputSignal<boolean> = input<boolean>(false);

  public readonly saved: OutputEmitterRef<CreateEntryPayload> = output<CreateEntryPayload>();
  public readonly cancelled: OutputEmitterRef<void> = output<void>();

  protected readonly directionOptions = ENTRY_DIRECTION_OPTIONS;

  protected readonly direction: WritableSignal<EntryDirection> = signal(EntryDirection.OwedToMe);
  protected readonly personName: WritableSignal<string> = signal('');
  protected readonly totalAmount: WritableSignal<number | null> = signal(null);
  protected readonly description: WritableSignal<string> = signal('');
  protected readonly dueDate: WritableSignal<string> = signal('');
  protected readonly splitIntoInstallments: WritableSignal<boolean> = signal(false);
  protected readonly installmentAmount: WritableSignal<number | null> = signal(null);
  protected readonly installmentDueDate: WritableSignal<string> = signal('');
  protected readonly installmentNote: WritableSignal<string> = signal('');

  protected onCancel(): void {
    this.cancelled.emit();
  }

  protected onSubmit(): void {
    const amount: number = this.totalAmount() ?? 0;
    const person: string = this.personName().trim();
    const due: string = this.dueDate();
    if (!person || amount <= 0 || !due) {
      return;
    }

    const installments: CreateInstallmentPayload[] = this.splitIntoInstallments()
      ? [
          {
            amount: this.installmentAmount() ?? amount,
            dueDate: this.installmentDueDate() || due,
            note: this.installmentNote() || undefined,
          },
        ]
      : [];

    this.saved.emit({
      groupId: this.groupId(),
      direction: this.direction(),
      personName: person,
      totalAmount: amount,
      description: this.description().trim(),
      dueDate: due,
      splitIntoInstallments: this.splitIntoInstallments(),
      installments,
    });
  }
}
