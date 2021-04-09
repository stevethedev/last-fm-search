import React from 'react';
import { Artist } from '../api/search';
import styles from './SearchResultList.module.css';

export interface Params extends React.HTMLProps<HTMLElement> {
  page: Artist[];
  onPageSelected: (artist: Artist) => void;
}

interface ItemParams extends React.HTMLProps<HTMLElement> {
  artist: Artist;
  onPageSelected: (artist: Artist) => void;
}

const SearchResultListItem = ({ artist, onPageSelected, ...rest }: ItemParams): JSX.Element => (
  <div
    role="button"
    tabIndex={0}
    className={`${styles['search-result-item']} ${rest.className ?? ''}`}
    onClick={() => onPageSelected(artist)}
    onKeyPress={(event) => (event.key === 'Enter' ? onPageSelected(artist) : null)}
  >
    <img src={artist.images.small ?? ''} alt={artist.name} />
    <span className={styles['search-result-item__text']}>{artist.name}</span>
  </div>
);

export const SearchResultList = ({ page, onPageSelected, ...rest }: Params): JSX.Element => {
  const items = page.map((artist) => (
    <SearchResultListItem
      className={styles['search-result-list__item']}
      artist={artist}
      key={artist.url}
      onPageSelected={onPageSelected}
    />
  ));

  return (
    <section className={`${styles['search-result-list']} ${rest.className ?? ''}`}>
      {items}
    </section>
  );
};
