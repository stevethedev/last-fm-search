import React, { ChangeEvent, KeyboardEventHandler, useState } from 'react';
import { useSubmitSearchDispatcher } from '../store/search';

export const SearchBar = (): JSX.Element => {
  const [artist, setArtist] = useState('');

  const submitSearchDispatcher = useSubmitSearchDispatcher();

  const submitSearch = () => submitSearchDispatcher({ artist });

  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = async (event) => {
    if (event.key === 'Enter') {
      await submitSearch();
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => setArtist(event.target.value);

  return (
    <div className="search-bar">
      <input className="search-bar__input" id="search" type="text" value={artist} onKeyPress={onKeyPress} onChange={onChange} />
      <button type="button" className="search-bar__button" onClick={submitSearch}>Go</button>
    </div>
  );
};
