import React from 'react';
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import { ArtistArticle } from './Artist';
import { useArtistSelector } from '../store/artist';

export const Search = (): JSX.Element => {
  const artist = useArtistSelector();

  return (
    <section className="app">
      <SearchBar />
      <SearchResults />
      { artist ? <ArtistArticle artist={artist} /> : <></> }
    </section>
  );
};
