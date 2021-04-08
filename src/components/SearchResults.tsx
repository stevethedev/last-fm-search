import React from 'react';
import {
  useCurrentPageNumberSelector,
  useCurrentPageSelector,
  useMaxPagesSelector,
  usePagesSelector,
  useSetCurrentPageDispatcher,
} from '../store/pages';
import { useSearchTextSelector, useSubmitSearchDispatcher } from '../store/search';
import { SearchResultList } from './SearchResultList';
import { Paginator } from './Paginator';
import { useSetSelectedArtistDispatcher } from '../store/artist';

export const SearchResults = (): JSX.Element => {
  const currentPage = useCurrentPageSelector();
  const currentPageNumber = useCurrentPageNumberSelector();
  const setPageDispatcher = useSetCurrentPageDispatcher();
  const submitSearch = useSubmitSearchDispatcher();
  const pages = usePagesSelector();
  const maxPages = useMaxPagesSelector();
  const artistName = useSearchTextSelector();
  const setSelectedArtist = useSetSelectedArtistDispatcher();

  const onSelectPage = async (n: number) => {
    setPageDispatcher(n);
    if (artistName && !pages[currentPageNumber]) {
      await submitSearch({ artist: artistName, page: currentPageNumber });
    }
  };

  return (
    <section className="search-results">
      <SearchResultList page={currentPage} onSelect={setSelectedArtist} />
      <Paginator
        start={1}
        end={maxPages}
        current={currentPageNumber}
        onSelectPage={onSelectPage}
        count={10}
      />
    </section>
  );
};
