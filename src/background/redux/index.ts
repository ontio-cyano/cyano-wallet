/*
 * Copyright (C) 2018 Matus Zamborsky
 * This file is part of The Ontology Wallet&ID.
 *
 * The The Ontology Wallet&ID is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Ontology Wallet&ID is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The Ontology Wallet&ID.  If not, see <http://www.gnu.org/licenses/>.
 */
import { alias, wrapStore } from 'react-chrome-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { GlobalStore } from '../../redux/state';
// import { composeWithDevTools } from 'remote-redux-devtools';
import { loaderReducer } from './loaderReducer';
import { routerReducer } from './routerReducer';
import { runtimeAliases, runtimeReducer } from './runtimeReducer';
import { settingsReducer } from './settingsReducer';
import { smartContractAliases, smartContractReducer } from './smartContractReducer';
import { statusReducer } from './statusReducer';
import { transactionReducer } from './transactionReducer';
import { transactionRequestsReducer } from './transactionRequestsReducer';
import { walletReducer } from './walletReducer';

export const globalReducer = combineReducers({
  loader: loaderReducer,
  router: routerReducer,
  runtime: runtimeReducer,
  settings: settingsReducer,
  smartContract: smartContractReducer,
  status: statusReducer,
  transaction: transactionReducer,
  transactionRequests: transactionRequestsReducer,
  wallet: walletReducer
});

export const aliases = {
  ...runtimeAliases,
  ...smartContractAliases
};

let store: GlobalStore;

export function initStore(): GlobalStore {
  // store = createStore(globalReducer, composeWithDevTools(applyMiddleware(alias(aliases), thunk)));
  store = createStore(globalReducer, applyMiddleware(alias(aliases), thunk));
  wrapStore(store, { portName: 'ONT_EXTENSION' });

  return store;
}

export function getStore() {
  return store;
}
