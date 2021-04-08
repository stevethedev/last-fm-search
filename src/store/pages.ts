import { Action } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Pages, State } from './state';
import { action, isAction, reducers } from './reducer';
import { bound } from '../utils';

// --- Selectors fetch data

export const useCurrentPageSelector = (): Pages[number] => (
  useSelector((s: State) => s.pages[s.currentPageNumber] ?? [])
);
export const useCurrentPageNumberSelector = (): State['currentPageNumber'] => useSelector((s: State) => s.currentPageNumber);
export const useMaxPagesSelector = (): State['maxPages'] => useSelector((s: State) => s.maxPages);
export const usePagesSelector = (): State['pages'] => useSelector((s: State) => s.pages);

// --- Dispatchers do things

export const useSetCurrentPageDispatcher = (): ((currentPage: State['currentPageNumber']) => void) => {
  const dispatch = useDispatch();
  const maxPages = useMaxPagesSelector();

  return (p) => {
    dispatch(action<SetCurrentPageAction>({ type: 'SET_CURRENT_PAGE', currentPageNumber: bound(p, 1, maxPages) }));
  };
};

export const useSetMaxPagesDispatcher = (): ((maxPages: State['maxPages']) => void) => {
  const dispatch = useDispatch();
  return (maxPages) => dispatch(action<SetMaxPagesAction>({ type: 'SET_MAX_PAGES', maxPages }));
};

export const useReplacePagesDispatcher = (): ((pages: State['pages']) => void) => {
  const dispatch = useDispatch();
  return (pages) => dispatch(action<ReplacePagesAction>({ type: 'REPLACE_PAGES', pages }));
};

export const usePutPageDispatcher = (): ((pages: State['pages']) => void) => {
  const dispatch = useDispatch();
  return (pages) => dispatch(action<PutPagesAction>({ type: 'PUT_PAGES', pages }));
};

export const useClearPagesDispatcher = (): (() => void) => {
  const replacePages = useReplacePagesDispatcher();
  return () => replacePages([]);
};

reducers.push((state: State, a: Action): State => {
  if (isAction<PutPagesAction>(a, 'PUT_PAGES')) {
    return { ...state, pages: { ...state.pages, ...a.pages } };
  }
  if (isAction<ReplacePagesAction>(a, 'REPLACE_PAGES')) {
    return { ...state, pages: a.pages };
  }
  if (isAction<SetCurrentPageAction>(a, 'SET_CURRENT_PAGE')) {
    return { ...state, currentPageNumber: a.currentPageNumber };
  }
  if (isAction<SetMaxPagesAction>(a, 'SET_MAX_PAGES')) {
    return { ...state, maxPages: a.maxPages };
  }
  return state;
});

interface ReplacePagesAction extends Action<'REPLACE_PAGES'> {
  pages: State['pages'];
}

interface PutPagesAction extends Action<'PUT_PAGES'> {
  pages: State['pages'];
}

interface SetCurrentPageAction extends Action<'SET_CURRENT_PAGE'> {
  currentPageNumber: State['currentPageNumber'];
}

interface SetMaxPagesAction extends Action<'SET_MAX_PAGES'> {
  maxPages: State['maxPages'];
}
