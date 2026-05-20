import {Component} from '@angular/core';
import {SectionTitle} from '../section-title/section-title';

@Component({
  selector: 'app-installment-panel-header',
  imports: [SectionTitle],
  template: `
    <app-section-title title="Raty i historia" />
  `,
})
export class InstallmentPanelHeader {}
