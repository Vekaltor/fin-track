import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';
import {provideEffects} from '@ngrx/effects';
import {provideState} from '@ngrx/store';
import {SettlementsEffects} from './settlements.effects';
import {settlementsReducer} from './settlements.reducer';
import {SETTLEMENTS_FEATURE_KEY} from './settlements.state';
import {SettlementsFacade} from './settlements.facade';

export function provideSettlementsStore(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState(SETTLEMENTS_FEATURE_KEY, settlementsReducer),
    provideEffects(SettlementsEffects),
    SettlementsFacade,
  ]);
}
