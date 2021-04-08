import {
  getNextPageAction, getPreviousPageAction, isGetNextPageAction, isGetPreviousPageAction,
  isSetCurrentPageAction,
  isSetPagesAction,
  setCurrentPageAction,
  setPagesAction,
} from './pages';

it('can identify the SetPagesAction interface', () => {
  expect(isSetPagesAction({ type: '' })).toEqual(false);
  expect(isSetPagesAction(setPagesAction({ type: 'SET_PAGES', pages: [] }))).toEqual(true);
});

it('can identify the SetCurrentPageAction interface', () => {
  expect(isSetCurrentPageAction({ type: '' })).toEqual(false);
  expect(isSetCurrentPageAction(setCurrentPageAction({ type: 'SET_CURRENT_PAGE', currentPage: 1 }))).toEqual(true);
});

it('can identify the GetNextPageAction interface', () => {
  expect(isGetNextPageAction({ type: '' })).toEqual(false);
  expect(isGetNextPageAction(getNextPageAction({ type: 'GET_NEXT_PAGE' }))).toEqual(true);
});

it('can identify the GetPreviousPageAction interface', () => {
  expect(isGetPreviousPageAction({ type: '' })).toEqual(false);
  expect(isGetPreviousPageAction(getPreviousPageAction({ type: 'GET_PREVIOUS_PAGE' }))).toEqual(true);
});
