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
  searchText: State['searchText'];
}

interface SetResultCountAction extends Action<'SET_SEARCH_RESULT_COUNT'> {
  resultCount: State['resultCount'];
}

export const useSearchTextSelector = (): State['searchText'] => useSelector((state: State) => state.searchText);
export const useSearchResultCountSelector = (): State['resultCount'] => useSelector((state: State) => state.resultCount);

export const useSetSearchParametersDispatcher = (): ((query: SearchParams) => void) => {
  const dispatch = useDispatch();
  return (query) => dispatch(action<SetSearchParametersAction>({ type: 'SET_SEARCH_PARAMS', searchText: query.artist }));
};

export const useSetSearchResultCountDispatcher = (): ((resultCount: State['resultCount']) => void) => {
  const dispatch = useDispatch();
  return (resultCount) => dispatch(action<SetResultCountAction>({ type: 'SET_SEARCH_RESULT_COUNT', resultCount }));
};

export const useSubmitSearchDispatcher = (): ((query: SearchParams) => Promise<void>) => {
  const state = useStateSelector();
  const clearPages = useClearPagesDispatcher();
  const setSearchParams = useSetSearchParametersDispatcher();
  const setMaxPages = useSetMaxPagesDispatcher();
  const putPages = usePutPageDispatcher();
  const setSearchResultCount = useSetSearchResultCountDispatcher();

  return async (query) => {
    if (state.searchText !== query.artist) {
      clearPages();
    }

    setSearchParams(query);

    const result = await search({ page: 1, ...query });
    if (!result) {
      return;
    }

    setSearchResultCount(result.meta.numResults);
    putPages({ [result.meta.page]: result.artists });
    setMaxPages(result.meta.pageCount);
  };
};

reducers.push((state: State, a: Action): State => {
  if (isAction<SetSearchParametersAction>(a, 'SET_SEARCH_PARAMS')) {
    return { ...state, searchText: a.searchText };
  }

  if (isAction<SetResultCountAction>(a, 'SET_SEARCH_RESULT_COUNT')) {
    return { ...state, resultCount: a.resultCount };
  }

  return state;
});
