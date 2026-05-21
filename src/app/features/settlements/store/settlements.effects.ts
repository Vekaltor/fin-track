import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of, switchMap} from 'rxjs';
import {SettlementsService} from '@core/services/settlements-service';
import {SettlementsActions} from './settlements.actions';

@Injectable()
export class SettlementsEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly settlementsService: SettlementsService = inject(SettlementsService);

  public readonly loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementsActions.loadGroups),
      switchMap(() =>
        this.settlementsService.loadGroups().pipe(
          map((groups) => SettlementsActions.loadGroupsSuccess({groups})),
          catchError((err: Error) =>
            of(SettlementsActions.loadGroupsFailure({error: err.message}))
          )
        )
      )
    )
  );

  public readonly createGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementsActions.createGroup),
      mergeMap(({payload}) =>
        this.settlementsService.createGroup(payload).pipe(
          map((group) => SettlementsActions.createGroupSuccess({group})),
          catchError((err: Error) =>
            of(SettlementsActions.createGroupFailure({error: err.message}))
          )
        )
      )
    )
  );

  public readonly deleteGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementsActions.deleteGroup),
      mergeMap(({groupId}) =>
        this.settlementsService.deleteGroup(groupId).pipe(
          map(() => SettlementsActions.deleteGroupSuccess({groupId})),
          catchError((err: Error) =>
            of(SettlementsActions.deleteGroupFailure({error: err.message}))
          )
        )
      )
    )
  );

  public readonly createEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementsActions.createEntry),
      mergeMap(({payload}) =>
        this.settlementsService.createEntry(payload).pipe(
          map((group) => SettlementsActions.createEntrySuccess({group})),
          catchError((err: Error) =>
            of(SettlementsActions.createEntryFailure({error: err.message}))
          )
        )
      )
    )
  );

  public readonly deleteEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementsActions.deleteEntry),
      mergeMap(({groupId, entryId}) =>
        this.settlementsService.deleteEntry(groupId, entryId).pipe(
          map((group) => SettlementsActions.deleteEntrySuccess({group})),
          catchError((err: Error) =>
            of(SettlementsActions.deleteEntryFailure({error: err.message}))
          )
        )
      )
    )
  );

  public readonly payInstallments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementsActions.payInstallments),
      mergeMap(({groupId, entryId, installmentIds}) =>
        this.settlementsService.payInstallments(groupId, entryId, installmentIds).pipe(
          map((group) => SettlementsActions.payInstallmentsSuccess({group})),
          catchError((err: Error) =>
            of(SettlementsActions.payInstallmentsFailure({error: err.message}))
          )
        )
      )
    )
  );

  public readonly archiveEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementsActions.archiveEntry),
      mergeMap(({groupId, entryId}) =>
        this.settlementsService.archiveEntry(groupId, entryId).pipe(
          map((group) => SettlementsActions.archiveEntrySuccess({group})),
          catchError((err: Error) =>
            of(SettlementsActions.archiveEntryFailure({error: err.message}))
          )
        )
      )
    )
  );
}
