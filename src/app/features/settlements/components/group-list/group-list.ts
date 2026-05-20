import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {SettlementsFacade} from '../../store/settlements.facade';
import {GroupPanel} from '../group-panel/group-panel';

@Component({
  selector: 'app-group-list',
  imports: [AsyncPipe, GroupPanel],
  templateUrl: './group-list.html',
})
export class GroupList {
  protected readonly facade: SettlementsFacade = inject(SettlementsFacade);
}
