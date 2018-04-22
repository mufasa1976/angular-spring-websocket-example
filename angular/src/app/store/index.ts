import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {environment} from '../../environments/environment';
import {storeFreeze} from 'ngrx-store-freeze';
import {RouterStateUrl} from '../shared';
import * as authentication from '../authentication/store/reducers';

export interface State {
  router: RouterReducerState<RouterStateUrl>,
  authentication: authentication.AuthenticationState,
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  authentication: authentication.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze as MetaReducer<State>]
  : [];
