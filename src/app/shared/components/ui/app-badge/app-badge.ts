import {Component, computed, input, InputSignal, Signal} from '@angular/core';
import {BadgeVariant} from '@shared/models/types/badge-variant.type';
import {cn} from '@utils/cn';

@Component({
  selector: 'app-badge',
  template: `<span [class]="badgeClass()"><ng-content /></span>`,
})
export class AppBadge {
  public readonly variant: InputSignal<BadgeVariant> = input<BadgeVariant>('default');
  public readonly className: InputSignal<string> = input<string>('');

  protected readonly badgeClass: Signal<string> = computed(() =>
    cn(
      'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
      this.variantClasses[this.variant()],
      this.className()
    )
  );

  private readonly variantClasses: Record<BadgeVariant, string> = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-receivable/10 text-receivable',
    danger: 'bg-debt/10 text-debt',
    warning: 'bg-primary/10 text-primary',
    neutral: 'bg-gray-100 text-muted',
  };
}
