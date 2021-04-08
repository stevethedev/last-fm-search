import React from 'react';
import {SearchBar} from './SearchBar';
import {SearchResults} from './SearchResults';

export const Search = () => {
    return (
        <section className={'app'}>
            <SearchBar/>
            <SearchResults/>
        </section>
    );
};
