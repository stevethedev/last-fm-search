import {getInitialState, State} from "./state";
import {Action} from "redux";
import {reducer as pageReducer} from "./pages";

export const reducer = (state = getInitialState(), action: Action): State => {
    return pageReducer(state, action);
}
