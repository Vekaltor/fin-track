import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of, switchMap} from 'rxjs';
import {SettlementsService} from '@core/services/settlements-service';
import {SettlementsPageActions} from './settlements-page.actions';
import {SettlementsApiActions} from './settlements-api.actions';

@Injectable()
export class SettlementsEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly settlementsService: SettlementsService = inject(SettlementsService);

  public readonly loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementsPageActions.loadGroups),
      switchMap(() =>
        this.settlementsService.loadGroups().pipe(
          map((groups) => SettlementsApiActions.loadGroupsSuccess({groups})),
          catchError((err: Error) =>
            of(SettlementsApiActions.loadGroupsFailure({error: err.message}))
          )
        )
      )
    )
  );

  public readonly createGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementsPageActions.createGroup),
      mergeMap(({payload}) =>
        this.settlementsService.createGroup(payload).pipe(
          map((group) => SettlementsApiActions.createGroupSuccess({group})),
          catchError((err: Error) =>
            of(SettlementsApiActions.createGroupFailure({error: err.message}))
          )
        )
      )
    )
  );

  public readonly deleteGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementsPageActions.deleteGroup),
      mergeMap(({groupId}) =>
        this.settlementsService.deleteGroup(groupId).pipe(
          map(() => SettlementsApiActions.deleteGroupSuccess({groupId})),
          catchError((err: Error) =>
            of(SettlementsApiActions.deleteGroupFailure({error: err.message}))
          )
        )
      )
    )
  );

  public readonly createEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementsPageActions.createEntry),
      mergeMap(({payload}) =>
        this.settlementsService.createEntry(payload).pipe(
          map((group) => SettlementsApiActions.createEntrySuccess({group})),
          catchError((err: Error) =>
            of(SettlementsApiActions.createEntryFailure({error: err.message}))
          )
        )
      )
    )
  );

  public readonly deleteEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementsPageActions.deleteEntry),
      mergeMap(({groupId, entryId}) =>
        this.settlementsService.deleteEntry(groupId, entryId).pipe(
          map((group) => SettlementsApiActions.deleteEntrySuccess({group})),
          catchError((err: Error) =>
            of(SettlementsApiActions.deleteEntryFailure({error: err.message}))
          )
        )
      )
    )
  );

  public readonly payInstallments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementsPageActions.payInstallments),
      mergeMap(({groupId, entryId, installmentIds}) =>
        this.settlementsService.payInstallments(groupId, entryId, installmentIds).pipe(
          map((group) => SettlementsApiActions.payInstallmentsSuccess({group})),
          catchError((err: Error) =>
            of(SettlementsApiActions.payInstallmentsFailure({error: err.message}))
          )
        )
      )
    )
  );

  public readonly archiveEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettlementsPageActions.archiveEntry),
      mergeMap(({groupId, entryId}) =>
        this.settlementsService.archiveEntry(groupId, entryId).pipe(
          map((group) => SettlementsApiActions.archiveEntrySuccess({group})),
          catchError((err: Error) =>
            of(SettlementsApiActions.archiveEntryFailure({error: err.message}))
          )
        )
      )
    )
  );
}
