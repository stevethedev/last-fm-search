import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from '../store/reducer';
import { Search } from './Search';

export default (): JSX.Element => {
  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <Search />
    </Provider>
  );
};
