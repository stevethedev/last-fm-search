import { Action } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { State } from './state';
import { action, isAction, reducers } from './reducer';
import { getInfo } from '../api/artist';
import { Artist } from '../api/search';

interface SetSelectedArtistAction extends Action<'SET_SELECTED_ARTIST'> {
  artist: State['artist'];
}

export const useArtistSelector = (): State['artist'] => (
  useSelector((s: State) => s.artist)
);

export const useSetSelectedArtistDispatcher = (): ((artist: State['artist']) => void) => {
  const dispatch = useDispatch();
  return (artist) => dispatch(action<SetSelectedArtistAction>({ type: 'SET_SELECTED_ARTIST', artist }));
};

export const useClearSelectedArtistDispatcher = (): (() => void) => {
  const setSelectedArtist = useSetSelectedArtistDispatcher();
  return () => setSelectedArtist(null);
};

export const useGetArtistDetailsDispatcher = (): ((artist: Artist) => Promise<void>) => {
  const selectArtist = useSetSelectedArtistDispatcher();

  return async (artist) => {
    selectArtist(artist);
    const details = await getInfo({ artist: artist.name });
    selectArtist(details?.artist ?? artist);
  };
};

reducers.push((state: State, a: Action): State => {
  if (isAction<SetSelectedArtistAction>(a, 'SET_SELECTED_ARTIST')) {
    return { ...state, artist: a.artist };
  }
  return state;
});
