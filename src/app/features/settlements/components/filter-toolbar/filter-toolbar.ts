import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {STATUS_FILTER_OPTIONS, TYPE_FILTER_OPTIONS} from '../../constants/filter-labels.constant';
import {SettlementsFacade} from '../../store/settlements.facade';
import {SortField} from '@core/models/sort-field.enum';
import {StatusFilter} from '@core/models/status-filter.enum';
import {TypeFilter} from '@core/models/type-filter.enum';
import {FilterChipRow} from '../ui/filter-chip-row/filter-chip-row';
import {SortSelect} from '../ui/sort-select/sort-select';

@Component({
  selector: 'app-filter-toolbar',
  imports: [AsyncPipe, FilterChipRow, SortSelect],
  templateUrl: './filter-toolbar.html',
})
export class FilterToolbar {
  protected readonly facade: SettlementsFacade = inject(SettlementsFacade);
  protected readonly typeOptions = TYPE_FILTER_OPTIONS;
  protected readonly statusOptions = STATUS_FILTER_OPTIONS;

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
