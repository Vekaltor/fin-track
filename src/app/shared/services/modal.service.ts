import {Injectable, Signal, signal, WritableSignal} from '@angular/core';

export interface ModalOpenOptions {
  readonly closeOnBackdrop?: boolean;
  readonly onClose?: () => void;
}

// TODO napisac testy ktore sprawdza czy mozna odpalic kilka modali i co sie stnaie jak zamkne
@Injectable({providedIn: 'root'})
export class ModalService {
  private readonly visible: WritableSignal<boolean> = signal(false);
  private readonly backdropClosable: WritableSignal<boolean> = signal(true);

  public readonly isOpen: Signal<boolean> = this.visible.asReadonly();
  public readonly canCloseOnBackdrop: Signal<boolean> = this.backdropClosable.asReadonly();

  private onCloseHandler: (() => void) | null = null;

  public open(options?: ModalOpenOptions): void {
    this.backdropClosable.set(options?.closeOnBackdrop ?? true);
    this.onCloseHandler = options?.onClose ?? null;
    this.visible.set(true);
  }

  public close(): void {
    if (!this.visible()) return;
    this.visible.set(false);
    const handler: (() => void) | null = this.onCloseHandler;
    this.onCloseHandler = null;
    handler?.();
  }

  public closeSilently(): void {
    this.visible.set(false);
    this.onCloseHandler = null;
  }
}
