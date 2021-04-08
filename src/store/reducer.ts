import { Action } from 'redux';
import { getInitialState, State } from './state';
import { reducer as pageReducer } from './pages';

const reducer = (state = getInitialState(), action: Action): State => pageReducer(state, action);

export { reducer };
