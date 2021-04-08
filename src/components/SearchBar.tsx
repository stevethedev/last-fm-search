import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPagesAction } from '../store/pages';
import { Artist } from '../api/search';

export const SearchBar = (): JSX.Element => {
  const [artist, setArtist] = useState('');

  const dispatch = useDispatch();
  const onSubmit = () => dispatch(setPagesAction({ type: 'SET_PAGES', pages: [[{ name: 'Test' } as Artist]] }));

  return (
    <div className="search-bar">
      <input className="search-bar__input" id="search" type="text" value={artist} onChange={(event) => setArtist(event.target.value)} />
      <button type="button" className="search-bar__button" onClick={onSubmit}>Go</button>
    </div>
  );
};
