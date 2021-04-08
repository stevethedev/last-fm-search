import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {State} from "../store/state";
import {repeat} from "../utils";
import {getNextPageAction, getPreviousPageAction} from "../store/pages";

export const SearchResults = () => {
    const artists = [{}, {}, {}];

    const dispatch = useDispatch();
    const currentPage = useSelector((s: State) => s.currentPage);

    const nextPage = () => dispatch(getNextPageAction({type: 'GET_NEXT_PAGE'}));
    const previousPage = () => dispatch(getPreviousPageAction({type: "GET_PREVIOUS_PAGE"}));

    return (
        <section className={'search-results'}>
            <ul className={'search-results__list'}>
                {artists.map((artist, index) => (
                    <li key={index} className={'search-results__list-item'}>{index}</li>
                ))}
            </ul>
            <ul className='search-results__pages'>
                <li onClick={previousPage}>Previous</li>
                {repeat(Math.min(10), i => (<li key={i}>{i + 1}</li>))}
                <li onClick={nextPage}>Next</li>
                {currentPage}
            </ul>
        </section>
    );
};
