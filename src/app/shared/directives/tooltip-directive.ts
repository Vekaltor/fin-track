import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  InputSignal,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements OnDestroy {
  public readonly appTooltip: InputSignal<string> = input<string>('');
  public readonly tooltipPosition: InputSignal<TooltipPosition> = input<TooltipPosition>('top');
  public readonly tooltipDelay: InputSignal<number> = input<number>(500);

  private readonly el: ElementRef<HTMLElement> = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer: Renderer2 = inject(Renderer2);
  private readonly document: Document = inject(DOCUMENT);
  private readonly platformId: object = inject(PLATFORM_ID);

  private tooltip: HTMLElement | null = null;
  private timeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect((): void => {
      const text: string = this.appTooltip();
      if (this.tooltip) {
        this.renderer.setProperty(this.tooltip, 'textContent', text);
      }
    })
  }

  @HostListener('mouseenter')
  @HostListener('focus')
  public onShow(): void {
    if (!isPlatformBrowser(this.platformId) || !this.appTooltip()) return;
    this.timeout = setTimeout(() => this.create(), this.tooltipDelay());
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  public onHide(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.destroy();
  }

  public ngOnDestroy(): void {
    if (this.timeout) clearTimeout(this.timeout);
    this.destroy();
  }

  private create(): void {
    if (this.tooltip) return;

    const el: HTMLElement = this.renderer.createElement('div');
    this.renderer.setProperty(el, 'textContent', this.appTooltip());
    this.renderer.setAttribute(el, 'role', 'tooltip');
    this.renderer.setAttribute(
      el,
      'class',
      'fixed z-[2] max-w-[220px] rounded-lg bg-primary/80 font-semibold text-white border-0 px-3 py-1.5 text-xs leading-relaxed text-gray-700 shadow-lg ring-1 ring-black/[0.04] pointer-events-none opacity-0 transition-opacity duration-150 break-words'
    )
    this.renderer.appendChild(this.document.body, el);
    this.tooltip = el;

    requestAnimationFrame(() => {
      if (!this.tooltip) return;
      this.position(this.tooltip);
      this.renderer.removeClass(this.tooltip, 'opacity-0');
      this.renderer.addClass(this.tooltip, 'opacity-100');
    });
  }

  private position(tooltip: HTMLElement): void {
    const host = this.el.nativeElement.getBoundingClientRect();
    const tip = tooltip.getBoundingClientRect();
    const gap = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let top: number;
    let left: number;

    switch (this.tooltipPosition()) {
      case 'bottom':
        top = host.bottom + gap;
        left = host.left + host.width / 2 - tip.width / 2;
        break;
      case 'left':
        top = host.top + host.height / 2 - tip.height / 2;
        left = host.left - tip.width - gap;
        break;
      case 'right':
        top = host.top + host.height / 2 - tip.height / 2;
        left = host.right + gap;
        break;
      default:
        top = host.top - tip.height - gap;
        left = host.left + host.width / 2 - tip.width / 2;
    }

    if (left < 8) left = 8;
    if (left + tip.width > vw - 8) left = vw - tip.width - 8;
    if (top < 8) top = host.bottom + gap;
    if (top + tip.height > vh - 8) top = host.top - tip.height - gap;

    this.renderer.setStyle(tooltip, 'top', `${top}px`);
    this.renderer.setStyle(tooltip, 'left', `${left}px`);
  }

  private destroy(): void {
    if (!this.tooltip) return;
    this.renderer.removeChild(this.document.body, this.tooltip);
    this.tooltip = null;
  }
}
