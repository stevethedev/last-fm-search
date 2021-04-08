import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { State, useStateSelector } from './state';
import { action, isAction, reducers } from './reducer';
import {
  usePutPageDispatcher,
  useClearPagesDispatcher,
  useSetMaxPagesDispatcher,
} from './pages';
import { search, SearchParams } from '../api/search';

interface SetSearchParametersAction extends Action<'SET_SEARCH_PARAMS'> {
  searchText: string | null;
}

export const useSearchTextSelector = (): State['searchText'] => useSelector((state: State) => state.searchText);

export const useSetSearchParametersDispatcher = (): ((query: SearchParams) => void) => {
  const dispatch = useDispatch();
  return (query: SearchParams) => dispatch(action<SetSearchParametersAction>({ type: 'SET_SEARCH_PARAMS', searchText: query.artist }));
};

export const useSubmitSearchDispatcher = (): ((query: SearchParams) => Promise<void>) => {
  const state = useStateSelector();
  const clearPages = useClearPagesDispatcher();
  const setSearchParams = useSetSearchParametersDispatcher();
  const setMaxPages = useSetMaxPagesDispatcher();
  const putPages = usePutPageDispatcher();

  return async (query) => {
    if (state.searchText !== query.artist) {
      clearPages();
    }

    setSearchParams(query);

    if (query.page && state.pages[query.page]) {
      return;
    }

    const result = await search({ page: 1, ...query });
    if (!result) {
      return;
    }

    putPages({ [result.meta.page]: result.artists });
    setMaxPages(result.meta.pageCount);
  };
};

reducers.push((state: State, a: Action): State => {
  if (isAction<SetSearchParametersAction>(a, 'SET_SEARCH_PARAMS')) {
    return { ...state, searchText: a.searchText };
  }

  return state;
});
