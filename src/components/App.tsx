import React from 'react';
import {reducer} from "../store/reducer";
import {Provider} from "react-redux";
import {Search} from "./Search";
import {createStore} from "redux";

export const App = () => {
    const store = createStore(reducer);

    return (
        <Provider store={store}>
            <Search />
        </Provider>
    );
};
