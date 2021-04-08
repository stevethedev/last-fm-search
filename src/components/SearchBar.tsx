import React, { useState } from 'react';
import { useSubmitSearchDispatcher } from '../store/search';

export const SearchBar = (): JSX.Element => {
  const [artist, setArtist] = useState('');

  const submitSearch = useSubmitSearchDispatcher();

  return (
    <div className="search-bar">
      <input className="search-bar__input" id="search" type="text" value={artist} onChange={(event) => setArtist(event.target.value)} />
      <button type="button" className="search-bar__button" onClick={() => submitSearch({ artist })}>Go</button>
    </div>
  );
};
