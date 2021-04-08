import {Artist} from "../api/search";

export interface State {
    pages: Artist[][];
    currentPage: number;
    maxPages: number;
}

export const getInitialState = (): State => ({
    pages: [],
    currentPage: 1,
    maxPages: 0
})
