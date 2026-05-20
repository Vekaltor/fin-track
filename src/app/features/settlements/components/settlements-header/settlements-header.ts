import {Component, inject} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {heroPlus} from '@ng-icons/heroicons/outline';
import {AppButton} from '@shared/components/ui/app-button/app-button';
import {SettlementsFacade} from '../../store/settlements.facade';

@Component({
  selector: 'app-settlements-header',
  imports: [AppButton, NgIcon],
  providers: [provideIcons({heroPlus})],
  templateUrl: './settlements-header.html',
})
export class SettlementsHeader {
  private readonly facade: SettlementsFacade = inject(SettlementsFacade);

  protected onNewGroup(): void {
    this.facade.showNewGroupForm();
  }
}
