import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoadingService {
  private readonly _pending: WritableSignal<ReadonlySet<string>> = signal<ReadonlySet<string>>(new Set());

  public readonly isLoading: Signal<boolean> = computed((): boolean => this._pending().size > 0);

  public isPending(operationId: string): Signal<boolean> {
    return computed((): boolean => this._pending().has(operationId));
  }

  public isSomeOfPending(operationIds: readonly string[]): Signal<boolean> {
    return computed((): boolean => operationIds.some((id: string): boolean => this._pending().has(id)));
  }

  public start(operationId: string): void {
    this._pending.update((s: ReadonlySet<string>): Set<string> => new Set([...s, operationId]));
  }

  public stop(operationId: string): void {
    this._pending.update((s: ReadonlySet<string>): Set<string> => {
      const next = new Set(s);
      next.delete(operationId);
      return next;
    });
  }
}
