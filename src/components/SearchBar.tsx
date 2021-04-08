import React, { ChangeEvent, KeyboardEventHandler, useState } from 'react';
import { useSubmitSearchDispatcher } from '../store/search';
import styles from './SearchBar.module.css';
import { useClearSelectedArtistDispatcher } from '../store/artist';

type Props = React.HTMLProps<HTMLDivElement>

export const SearchBar = ({ ...rest }: Props): JSX.Element => {
  const [artist, setArtist] = useState('');

  const submitSearchDispatcher = useSubmitSearchDispatcher();
  const clearSelectedArtist = useClearSelectedArtistDispatcher();

  const submitSearch = async () => {
    clearSelectedArtist();
    await submitSearchDispatcher({ artist });
  };

  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = async (event) => {
    if (event.key === 'Enter') {
      await submitSearch();
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => setArtist(event.target.value);

  return (
    <div className={`${styles['search-bar']} ${rest.className ?? ''}`}>
      <input className={styles['search-bar__input']} id="search" type="text" value={artist} onKeyPress={onKeyPress} onChange={onChange} />
      <button type="button" className={styles['search-bar__button']} onClick={submitSearch}>Go</button>
    </div>
  );
};
