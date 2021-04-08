import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from '../store/reducer';
import { Search } from './Search';
import styles from './App.module.css';

export default (): JSX.Element => {
  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <Search className={styles.app} />
    </Provider>
  );
};
