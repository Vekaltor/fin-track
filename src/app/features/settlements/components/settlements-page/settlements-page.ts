import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {SettlementsConfirmDialog} from '../settlements-confirm-dialog/settlements-confirm-dialog';
import {FilterToolbar} from '../filter-toolbar/filter-toolbar';
import {GroupList} from '../group-list/group-list';
import {NewGroupForm} from '../new-group-form/new-group-form';
import {SettlementsHeader} from '../settlements-header/settlements-header';
import {SummaryCards} from '../summary-cards/summary-cards';
import {SettlementsFacade} from '../../store/settlements.facade';

@Component({
  selector: 'app-settlements-page',
  imports: [
    AsyncPipe,
    SettlementsHeader,
    SummaryCards,
    FilterToolbar,
    NewGroupForm,
    GroupList,
    SettlementsConfirmDialog,
  ],
  templateUrl: './settlements-page.html',
})
export class SettlementsPage implements OnInit {
  protected readonly facade: SettlementsFacade = inject(SettlementsFacade);

  public ngOnInit(): void {
    this.facade.loadGroups();
  }
}
