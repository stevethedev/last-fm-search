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
import styles from './SearchResults.module.css';

type Props = React.HTMLProps<HTMLElement>

export const SearchResults = ({ ...rest }: Props): JSX.Element => {
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
    <section className={`${styles['search-results']} ${rest.className}`}>
      <SearchResultList className={styles['search-results__list']} page={currentPage} onPageSelected={setSelectedArtist} />
      <Paginator
        className={styles['search-results__result']}
        start={1}
        end={maxPages}
        current={currentPageNumber}
        onSelectPage={onSelectPage}
        count={10}
      />
    </section>
  );
};
