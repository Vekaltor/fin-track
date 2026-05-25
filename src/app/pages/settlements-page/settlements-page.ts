import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {FilterToolbar} from '@features/settlements/components/filter-toolbar/filter-toolbar';
import {GroupList} from '@features/settlements/components/group-list/group-list';
import {NewGroupForm} from '@features/settlements/components/new-group-form/new-group-form';
import {SettlementsHeader} from '@features/settlements/components/settlements-header/settlements-header';
import {SummaryCards} from '@features/settlements/components/summary-cards/summary-cards';
import {SettlementsFacade} from '@features/settlements/store/settlements.facade';
import {toSignal} from '@angular/core/rxjs-interop';
import {
  SettlementsConfirmDialog
} from '@features/settlements/components/settlements-confirm-dialog/settlements-confirm-dialog';

@Component({
  selector: 'app-settlements-page',
  imports: [
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
  private readonly facade: SettlementsFacade = inject(SettlementsFacade);
  protected readonly vm = toSignal(this.facade.vm$);
  protected readonly showNewGroupForm: WritableSignal<boolean> = signal(false);

  public ngOnInit(): void {
    this.facade.loadGroups();
  }
}
