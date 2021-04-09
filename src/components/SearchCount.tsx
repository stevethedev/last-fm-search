import React from 'react';
import { useSearchResultCountSelector } from '../store/search';
import styles from './SearchCount.module.css';

type Params = React.HTMLProps<HTMLSpanElement>

export const SearchCount = ({ ...args }: Params): JSX.Element => {
  const count = useSearchResultCountSelector();

  return (
    <span className={`${styles['search-count']} ${args.className ?? ''}`}>
      {count.toLocaleString()}
      {' '}
      results
    </span>
  );
};
