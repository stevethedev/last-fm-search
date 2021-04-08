import React from 'react';
import { repeat } from '../utils';
import { usePagination } from '../store/pages';
import { Artist } from '../api/search';

export const SearchResults = (): JSX.Element => {
  const artists: Artist[] = [{ mbid: 'a' }, { mbid: 'b' }, { mbid: 'c' }] as Artist[];

  const {
    currentPage,
    nextPage,
    previousPage,
    setPage,
  } = usePagination();

  return (
    <section className="search-results">
      <ul className="search-results__list">
        {artists.map((artist) => (
          <li key={artist.mbid} className="search-results__list-item">{artist.mbid}</li>
        ))}
      </ul>
      <section className="search-results__pages">
        <button type="button" onClick={previousPage} onKeyPress={previousPage}>Previous</button>
        {repeat(Math.min(10), (i) => (<button type="button" onClick={() => setPage(i + 1)} onKeyPress={() => setPage(i + 1)} key={i}>{i + 1}</button>))}
        <button type="button" onClick={nextPage} onKeyPress={nextPage}>Next</button>
        {currentPage}
      </section>
    </section>
  );
};
