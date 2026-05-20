import {afterNextRender, DestroyRef, Directive, ElementRef, inject, output, OutputEmitterRef} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  private readonly el: ElementRef<HTMLElement> = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef: DestroyRef = inject<DestroyRef>(DestroyRef);

  readonly clickOutside: OutputEmitterRef<void> = output<void>();

  constructor() {
    afterNextRender((): void => {
      const handler = (event: MouseEvent): void => {
        const target = event.target as Node;

        if (!this.el.nativeElement.contains(target)) {
          this.clickOutside.emit();
        }
      };

      document.addEventListener('click', handler);
      this.destroyRef.onDestroy((): void => {
        document.removeEventListener('click', handler);
      });
    });
  }
}
