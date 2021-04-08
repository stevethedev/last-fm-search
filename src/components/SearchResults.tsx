import React, { useState } from 'react';
import { range } from '../utils';
import {
  useCurrentPageNumberSelector, useCurrentPageSelector,
  useGetNextPageDispatcher,
  useGetPreviousPageDispatcher, usePagesSelector,
  useSetCurrentPageDispatcher,
} from '../store/pages';
import { useSearchTextSelector, useSubmitSearchDispatcher } from '../store/search';

export const SearchResults = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  const currentPage = useCurrentPageSelector();
  const currentPageNumber = useCurrentPageNumberSelector();
  const nextPageDispatcher = useGetNextPageDispatcher();
  const previousPageDispatcher = useGetPreviousPageDispatcher();
  const setPageDispatcher = useSetCurrentPageDispatcher();
  const submitSearch = useSubmitSearchDispatcher();
  const pages = usePagesSelector();

  const artistName = useSearchTextSelector();

  const updateSearch = async () => {
    setIsLoading(true);
    if (artistName && !pages[currentPageNumber]) {
      await submitSearch({ artist: artistName, page: currentPageNumber });
    }
    setIsLoading(false);
  };

  const nextPage = async () => {
    nextPageDispatcher();
    await updateSearch();
  };

  const previousPage = async () => {
    previousPageDispatcher();
    await updateSearch();
  };

  const setPage = async (page: number) => {
    setPageDispatcher(page);
    await updateSearch();
  };

  return (
    <section className="search-results">
      {isLoading ? <div>Loading</div>
        : (
          <ul className="search-results__list">
            {currentPage.map((artist) => (
              <li key={artist.url} className="search-results__list-item">{artist.mbid}</li>
            ))}
          </ul>
        )}
      <section className="search-results__pages">
        <button type="button" onClick={previousPage} onKeyPress={previousPage}>Previous</button>
        {
          range(0, 5)
            .map((i) => {
              const setPageI = () => setPage(i + 1);
              return (
                <button
                  type="button"
                  onClick={setPageI}
                  onKeyPress={setPageI}
                  key={i}
                >
                  {i + 1}
                </button>
              );
            })
        }
        <button type="button" onClick={nextPage} onKeyPress={nextPage}>Next</button>
        {currentPageNumber}
      </section>
    </section>
  );
};
