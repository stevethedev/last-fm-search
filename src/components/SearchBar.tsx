import React, {useState} from 'react';
import {setPagesAction} from "../store/pages";
import {useDispatch} from "react-redux";

export const SearchBar = () => {
    const [artist, setArtist] = useState('');

    const dispatch = useDispatch();
    const onSubmit = () => dispatch(setPagesAction({type: 'SET_PAGES', pages: [[{name: 'Test'} as any]]}))

    return (
        <div className={'search-bar'}>
            <label className='search-bar__label'>Search</label>
            <input className='search-bar__input' type='text' value={artist} onChange={event => setArtist(event.target.value)} />
            <button className='search-bar__button' onClick={onSubmit}>Go</button>
        </div>
    );
}
