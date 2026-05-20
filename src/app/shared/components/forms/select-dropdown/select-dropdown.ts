import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import {Field, FormField} from '@angular/forms/signals';
import {provideIcons} from '@ng-icons/core';
import {heroChevronDown} from '@ng-icons/heroicons/outline';
import {SelectOption as SelectOptionType} from '@shared/models/types/select-option.type';
import {cn} from '@utils/cn';
import {SelectTrigger} from '@shared/components/forms/select-dropdown/select-trigger/select-trigger';
import {SelectOption} from '@shared/components/forms/select-dropdown/select-option/select-option';

@Component({
  selector: 'app-select-dropdown',
  imports: [FormField, SelectTrigger, SelectOption],
  providers: [provideIcons({heroChevronDown})],
  templateUrl: './select-dropdown.html',
})
export class SelectDropdown<T extends string = string> implements AfterViewInit {
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

  public readonly field: InputSignal<Field<T> | undefined> = input<Field<T>>();
  public readonly value: InputSignal<T | undefined> = input<T>();
  public readonly options: InputSignal<SelectOptionType<T>[]> = input.required<SelectOptionType<T>[]>();
  public readonly placeholder: InputSignal<string> = input<string>('Wybierz');
  public readonly className: InputSignal<string> = input<string>('');

  public readonly valueChange: OutputEmitterRef<T> = output<T>();

  protected readonly isOpen: WritableSignal<boolean> = signal(false);
  protected readonly currentValue: WritableSignal<T | ''> = signal('');
  private readonly nativeSelectRef: Signal<ElementRef<HTMLSelectElement> | undefined> = viewChild<ElementRef<HTMLSelectElement>>('nativeSelect');

  protected readonly isFormMode: Signal<boolean> = computed((): boolean => this.field() !== undefined);
  protected readonly selectedLabel: Signal<string> = computed((): string => {
    const match = this.options().find((opt): boolean => opt.value === this.currentValue());
    return match?.label ?? this.placeholder();
  });

  protected readonly cn = cn;

  constructor() {
    effect((): void => {
      if (this.isFormMode()) return;
      const bound: T | undefined = this.value();
      if (bound !== undefined) this.currentValue.set(bound);
    });
  }

  public ngAfterViewInit(): void {
    const el: HTMLSelectElement | undefined = this.nativeSelectRef()?.nativeElement;
    if (el) this.currentValue.set(el.value as T);
  }

  protected toggle(): void {
    this.isOpen.update((open: boolean): boolean => !open);
  }

  protected close(): void {
    this.isOpen.set(false);
  }

  protected select(value: T): void {
    const el: HTMLSelectElement | undefined = this.nativeSelectRef()?.nativeElement;
    if (this.isFormMode()) {
      if (!el) return;
      el.value = value;
      el.dispatchEvent(new Event('change', {bubbles: true}));
    } else {
      this.currentValue.set(value);
      if (el) el.value = value;
      this.valueChange.emit(value);
    }
    this.close();
  }

  protected onNativeChange(): void {
    const el: HTMLSelectElement | undefined = this.nativeSelectRef()?.nativeElement;
    if (!el) return;
    this.currentValue.set(el.value as T);
    if (!this.isFormMode()) this.valueChange.emit(el.value as T);
  }

  protected isSelected(value: T): boolean {
    return this.currentValue() === value;
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (this.isOpen() && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.close();
  }
}
