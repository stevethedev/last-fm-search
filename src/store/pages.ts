import {Action} from "redux";
import {Artist} from "../api/search";
import {State} from "./state";

export interface SetPagesAction extends Action<'SET_PAGES'> {
    pages: Artist[][];
}
export const isSetPagesAction = (action: Action): action is SetPagesAction => action.type === 'SET_PAGESh';
export const setPagesAction = (action: SetPagesAction) => action;

export interface SetCurrentPageAction extends Action<'SET_CURRENT_PAGE'> {
    currentPage: number;
}
export const isSetCurrentPageAction = (action: Action): action is SetCurrentPageAction => action.type === 'SET_CURRENT_PAGE';
export const setCurrentPageAction = (action: SetCurrentPageAction) => action;

export type GetNextPageAction = Action<'GET_NEXT_PAGE'>;
export const isGetNextPageAction = (action: Action): action is GetNextPageAction => action.type === 'GET_NEXT_PAGE';
export const getNextPageAction = (action: GetNextPageAction) => action;

export type GetPreviousPageAction = Action<'GET_PREVIOUS_PAGE'>;
export const isGetPreviousPageAction = (action: Action): action is GetPreviousPageAction => action.type === 'GET_PREVIOUS_PAGE';
export const getPreviousPageAction = (action: GetPreviousPageAction) => action;

export const reducer = (state: State, action: Action): State => {
    if (isGetNextPageAction(action)) {
        return {...state, currentPage: Math.min(state.maxPages, state.currentPage + 1)}
    }
    if (isGetPreviousPageAction(action)) {
        return {...state, currentPage: Math.max(1, state.currentPage - 1)}
    }
    if (isSetPagesAction(action)) {
        return {...state, pages: action.pages};
    }
    if (isSetCurrentPageAction(action)) {
        return {...state, currentPage: action.currentPage};
    }
    return state;
}

