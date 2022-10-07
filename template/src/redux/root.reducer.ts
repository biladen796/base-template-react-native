import {combineReducers} from 'redux';
import {AuthReducerState, createAuthReducer} from './reducer/auth.reducer';

export type ActionType = {
  type: string;
  payload?: Record<string, unknown>;
};

export type RootStateType = {
  createAuthReducer: AuthReducerState;
};

const reducerList = {
  createAuthReducer,
};

export const rootReducer = combineReducers(reducerList);
