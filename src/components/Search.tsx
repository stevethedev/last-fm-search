import React from 'react';
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import { ArtistArticle } from './Artist';
import { useArtistSelector } from '../store/artist';
import styles from './Search.module.css';
import { flattenStyles } from '../utils';

type Props = React.HTMLProps<HTMLElement>

export const Search = ({ className }: Props): JSX.Element => {
  const artist = useArtistSelector();

  return (
    <section className={flattenStyles({ [className ?? '']: className?.length !== 0, [styles.search]: true })}>
      <SearchBar className={styles['search__search-bar']} />
      { artist
        ? <ArtistArticle artist={artist} className={styles['search__search-result']} />
        : <SearchResults className={styles['search__search-results']} /> }
    </section>
  );
};
