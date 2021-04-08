import React from 'react';
import { Artist } from '../api/search';

export interface Params {
  page: Artist[];
}

const SearchResultListItem = ({ artist }: { artist: Artist }): JSX.Element => (
  <li className="search-results__list-item">{artist.name}</li>
);

export const SearchResultList = ({ page }: Params): JSX.Element => (
  <ul className="search-results__list">
    {page.map((artist) => <SearchResultListItem artist={artist} key={artist.url} />)}
  </ul>
);
