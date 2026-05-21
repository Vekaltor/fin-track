import {Component, input, InputSignal, model, ModelSignal, output, OutputEmitterRef} from '@angular/core';
import {form, required, submit} from '@angular/forms/signals';
import {CreateEntryPayload} from '@core/models/create-entry-payload.interface';
import {CreateInstallmentPayload} from '@core/models/create-installment-payload.interface';
import {EntryDirection} from '@core/models/entry-direction.enum';
import {InstallmentIntervalUnit} from '@core/models/installment-interval-unit.enum';
import {CheckboxField} from '@shared/components/forms/checkbox-field/checkbox-field';
import {SelectField} from '@shared/components/forms/select-field/select-field';
import {TextField} from '@shared/components/forms/text-field/text-field';
import {ENTRY_DIRECTION_OPTIONS} from '../../constants/entry-direction-labels';
import {INSTALLMENT_INTERVAL_UNIT_OPTIONS} from '../../constants/installment-interval-unit-labels';
import {buildInstallmentPayloads, isValidInstallmentInterval} from '../../utils/generate-installments.util';
import {parsePlnAmount} from '@shared/helpers/format-currency-pln';
import {FormActions} from '../ui/form-actions/form-actions';
import {SectionTitle} from '../ui/section-title/section-title';
import {NumberField} from '@shared/components/forms/number-field/number-field';
import {InputLabel} from '@shared/components/forms/input-label/input-label';
import {DateField} from '@shared/components/forms/date-field/date-field';
import {SelectDropdown} from '@shared/components/forms/select-dropdown/select-dropdown';

interface EntryFormModel {
  readonly direction: EntryDirection;
  readonly personName: string;
  readonly totalAmount: string;
  readonly description: string;
  readonly dueDate: string;
  readonly splitIntoInstallments: boolean;
  readonly installmentCount: string;
  readonly installmentIntervalAmount: string;
  readonly installmentIntervalUnit: InstallmentIntervalUnit;
}

@Component({
  selector: 'app-entry-form',
  imports: [
    TextField,
    SelectField,
    CheckboxField,
    FormActions,
    SectionTitle,
    NumberField,
    InputLabel,
    DateField,
    SelectDropdown,
  ],
  templateUrl: './entry-form.html',
})
export class EntryForm {
  public readonly groupId: InputSignal<string> = input.required<string>();
  public readonly groupName: InputSignal<string> = input.required<string>();
  public readonly saving: InputSignal<boolean> = input<boolean>(false);

  public readonly saved: OutputEmitterRef<CreateEntryPayload> = output<CreateEntryPayload>();
  public readonly cancelled: OutputEmitterRef<void> = output<void>();

  protected readonly directionOptions = ENTRY_DIRECTION_OPTIONS;
  protected readonly installmentIntervalUnitOptions = INSTALLMENT_INTERVAL_UNIT_OPTIONS;

  protected readonly formModel: ModelSignal<EntryFormModel> = model<EntryFormModel>({
    direction: EntryDirection.OWED_TO_ME,
    personName: '',
    totalAmount: '',
    description: '',
    dueDate: '',
    splitIntoInstallments: false,
    installmentCount: '',
    installmentIntervalAmount: '1',
    installmentIntervalUnit: InstallmentIntervalUnit.MONTHS,
  });

  protected readonly entryForm = form(this.formModel, (schema): void => {
    required(schema.personName, {message: 'Podaj osobę'});
    required(schema.totalAmount, {message: 'Podaj kwotę'});
    required(schema.dueDate, {message: 'Podaj termin'});
  });

  protected onCancel(): void {
    this.cancelled.emit();
  }

  protected handleSubmit(event: SubmitEvent): void {
    event.preventDefault();
    this.entryForm().markAsTouched();
    void submit(this.entryForm, {
      action: async (instance): Promise<void> => {
        const amount: number | null = parsePlnAmount(instance.totalAmount().value());
        const person: string = instance.personName().value().trim();
        const due: string = instance.dueDate().value();
        if (!person || amount === null || amount <= 0 || !due) {
          return;
        }

        const split: boolean = instance.splitIntoInstallments().value();
        let installments: CreateInstallmentPayload[] = [];
        let intervalAmount: number | undefined;
        let intervalUnit: InstallmentIntervalUnit | undefined;

        if (split) {
          const count: number = Number.parseInt(instance.installmentCount().value(), 10);
          if (!Number.isFinite(count) || count < 2) {
            return;
          }

          intervalAmount = Number.parseInt(instance.installmentIntervalAmount().value(), 10);
          intervalUnit = instance.installmentIntervalUnit().value();
          if (!isValidInstallmentInterval(intervalAmount, intervalUnit)) {
            return;
          }

          installments = buildInstallmentPayloads(
            amount,
            due,
            count,
            intervalAmount,
            intervalUnit
          );
        }

        this.saved.emit({
          groupId: this.groupId(),
          direction: instance.direction().value(),
          personName: person,
          totalAmount: amount,
          description: instance.description().value().trim(),
          dueDate: due,
          splitIntoInstallments: split,
          installments,
          installmentIntervalAmount: split ? intervalAmount : undefined,
          installmentIntervalUnit: split ? intervalUnit : undefined,
        });
      },
    });
  }
}
