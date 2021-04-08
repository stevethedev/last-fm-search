import { Action, Reducer } from 'redux';
import { getInitialState, State } from './state';

export const reducers: Reducer[] = [];

export const reducer = (state = getInitialState(), action: Action): State => (
  reducers.reduce((acc, r) => r(acc, action), state)
);

export const action = <T extends Action>(a: T): T => a;
export const isAction = <T extends Action>(a: Action, type: T['type']): a is T => a.type === type;
