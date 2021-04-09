import React from 'react';
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import { ArtistArticle } from './Artist';
import { useArtistSelector } from '../store/artist';
import styles from './Search.module.css';
import { flattenStyles } from '../utils';
import { SearchCount } from './SearchCount';
import { useSearchResultCountSelector } from '../store/search';

type Props = React.HTMLProps<HTMLElement>

export const Search = ({ className }: Props): JSX.Element => {
  const artist = useArtistSelector();
  const count = useSearchResultCountSelector();

  return (
    <section className={flattenStyles({ [className ?? '']: className?.length !== 0, [styles.search]: true })}>
      <div className={styles.search__top}>
        <SearchBar className={styles['search__search-bar']} />
        { count ? <SearchCount className={styles['search__result-count']} /> : <></> }
      </div>
      { artist
        ? <ArtistArticle artist={artist} className={styles['search__search-result']} />
        : <SearchResults className={styles['search__search-results']} /> }
    </section>
  );
};
