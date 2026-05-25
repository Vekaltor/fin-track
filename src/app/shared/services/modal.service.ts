import {Injectable, Signal, signal, WritableSignal} from '@angular/core';

export interface ModalOpenOptions {
  readonly closeOnBackdrop?: boolean;
  readonly onClose?: () => void;
}

// TODO napisac testy ktore sprawdza czy mozna odpalic kilka modali i co sie stnaie jak zamkne
@Injectable({providedIn: 'root'})
export class ModalService {
  private readonly _visible: WritableSignal<boolean> = signal(false);
  private readonly _data: WritableSignal<unknown> = signal<unknown>(null);
  private readonly _backdropClosable: WritableSignal<boolean> = signal(true);
  private onCloseHandler: (() => void) | null = null;

  public readonly isOpen: Signal<boolean> = this._visible.asReadonly();
  public readonly canCloseOnBackdrop: Signal<boolean> = this._backdropClosable.asReadonly();

  public open<T>(data?: T, options?: ModalOpenOptions): void {
    this._data.set(data ?? null);
    this._backdropClosable.set(options?.closeOnBackdrop ?? true);
    this.onCloseHandler = options?.onClose ?? null;
    this._visible.set(true);
  }

  public getData<T>(): T | null {
    return this._data() as T | null;
  }

  public close(): void {
    if (!this._visible()) return;
    this._visible.set(false);
    this._data.set(null);
    const handler = this.onCloseHandler;
    this.onCloseHandler = null;
    handler?.();
  }

  public closeSilently(): void {
    this._visible.set(false);
    this._data.set(null);
    this.onCloseHandler = null;
  }
}
