import {Component, inject, Signal} from '@angular/core';
import {SettlementsFacade} from '../../store/settlements.facade';
import {GroupPanel} from '../group-panel/group-panel';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-group-list',
  imports: [GroupPanel],
  templateUrl: './group-list.html',
})
export class GroupList {
  protected readonly facade: SettlementsFacade = inject(SettlementsFacade);

  protected readonly vm = toSignal(this.facade.vm$);

  protected readonly isLoading: Signal<boolean> = this.facade.isLoadingGroups;
}
