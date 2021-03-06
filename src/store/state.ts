import { useSelector } from 'react-redux';
import { Artist } from '../api/search';

export interface Pages {
  [index: number]: Artist[];
}

export interface State {
    pages: Pages;
    currentPageNumber: number;
    maxPages: number;

    searchText: string | null;
    resultCount: number;

    artist: Artist | null;
}

export const getInitialState = (): State => ({
  pages: Object.create(null),
  currentPageNumber: 1,
  maxPages: 0,

  searchText: null,
  resultCount: 0,

  artist: null,
});

export const useStateSelector = (): State => useSelector((s: State) => s);
