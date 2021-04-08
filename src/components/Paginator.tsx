import React from 'react';
import { bound, flattenStyles, range } from '../utils';
import styles from './Paginator.module.css';

interface PaginatorParams extends React.HTMLProps<HTMLElement> {
  start: number;
  end: number;
  current: number;
  count: number;

  onSelectPage: (page: number) => void;
}

interface ButtonParams extends React.HTMLProps<HTMLButtonElement> {
  index: number;
  current: number;
  onSelectPage: (page: number) => void;
}

const PaginatorButton = ({
  index, onSelectPage, current, ...rest
}: ButtonParams) => (
  <button
    type="button"
    className={flattenStyles({
      [styles['paginator-button']]: true,
      [rest.className ?? '']: rest.className?.length !== 0,
      [styles['paginator-button--selected']]: index === current,
    })}
    onClick={() => onSelectPage?.(index)}
    onKeyPress={() => onSelectPage?.(index)}
  >
    {rest.content}
  </button>
);

export const Paginator = ({
  current, start, end, onSelectPage, count,
}: PaginatorParams): JSX.Element => {
  // eslint-disable-next-line no-bitwise
  const halfCount = count >> 1; // Guaranteed an integer ~1/2 of count

  const first = bound(current - halfCount, 1, end);
  const last = bound(first + count, 1, end);

  const buttons = range(first, last).map((i) => (
    <PaginatorButton key={i} index={i} content={`${i}`} onSelectPage={onSelectPage} current={current} />
  ));

  const previous = current === start
    ? <></>
    : <PaginatorButton onSelectPage={onSelectPage} index={current - 1} content="Previous" current={current} />;

  const next = current >= end
    ? <></>
    : <PaginatorButton onSelectPage={onSelectPage} index={current + 1} content="Next" current={current} />;

  return (
    <section className={styles.paginator}>
      {previous}
      {buttons}
      {next}
    </section>
  );
};
