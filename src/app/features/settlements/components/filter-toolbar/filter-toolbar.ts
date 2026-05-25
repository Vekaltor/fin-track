import {Component, inject} from '@angular/core';
import {SettlementsFacade} from '../../store/settlements.facade';
import {SortField} from '@features/settlements/models/sort-field.enum';
import {StatusFilter} from '@features/settlements/models/status-filter.enum';
import {TypeFilter} from '@features/settlements/models/type-filter.enum';
import {FilterChipRow} from '../ui/filter-chip-row/filter-chip-row';
import {SortSelect} from '../ui/sort-select/sort-select';
import {TYPE_FILTER_OPTIONS} from '@features/settlements/constants/type-filter-options';
import {STATUS_FILTER_OPTIONS} from '@features/settlements/constants/status-filter-options';
import {toSignal} from '@angular/core/rxjs-interop';
import {SelectOption} from '@shared/models/types/select-option.type';

@Component({
  selector: 'app-filter-toolbar',
  imports: [FilterChipRow, SortSelect],
  templateUrl: './filter-toolbar.html',
})
export class FilterToolbar {
  private readonly facade: SettlementsFacade = inject(SettlementsFacade);

  protected readonly vm = toSignal(this.facade.vm$);
  protected readonly typeOptions: SelectOption<TypeFilter>[] = TYPE_FILTER_OPTIONS;
  protected readonly statusOptions: SelectOption<StatusFilter>[] = STATUS_FILTER_OPTIONS;

  protected onTypeFilter(filter: TypeFilter): void {
    this.facade.setTypeFilter(filter);
  }

  protected onStatusFilter(filter: StatusFilter): void {
    this.facade.setStatusFilter(filter);
  }

  protected onSortChange(sort: SortField): void {
    this.facade.setSortField(sort);
  }
}
