import React from 'react';
import { Artist } from '../api/search';

export interface Params {
  page: Artist[];
  onSelect: (artist: Artist) => void;
}

interface ItemParams {
  artist: Artist;
  onClick: (artist: Artist) => void;
}

const SearchResultListItem = ({ artist, onClick }: ItemParams): JSX.Element => (
  <div
    role="button"
    tabIndex={0}
    className="search-results__list-item"
    onClick={() => onClick(artist)}
    onKeyPress={(event) => (event.key === 'Enter' ? onClick(artist) : null)}
  >
    {artist.name}
  </div>
);

export const SearchResultList = ({ page, onSelect }: Params): JSX.Element => {
  const items = page.map((artist) => (
    <SearchResultListItem artist={artist} key={artist.url} onClick={onSelect} />));

  return (
    <section className="search-results__list">
      {items}
    </section>
  );
};
