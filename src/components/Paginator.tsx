import React from 'react';
import { bound, range } from '../utils';

interface PaginatorParams {
  start: number;
  end: number;
  current: number;
  count: number;

  onSelectPage: (page: number) => void;
}

interface ButtonParams {target: number;
content: JSX.Element | string | number;
current: number;
onSelectPage: (page: number) => void}

const PaginatorButton = ({
  target, onSelectPage, content, current,
}: ButtonParams) => (
  <button
    type="button"
    className={`paginator-button ${target === current ? 'paginator-button--selected' : ''}`}
    onClick={() => onSelectPage?.(target)}
    onKeyPress={() => onSelectPage?.(target)}
  >
    {content}
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
    <PaginatorButton key={i} target={i} content={i} onSelectPage={onSelectPage} current={current} />
  ));

  const previous = current === start
    ? <></>
    : <PaginatorButton onSelectPage={onSelectPage} target={current - 1} content="Previous" current={current} />;

  const next = current >= end
    ? <></>
    : <PaginatorButton onSelectPage={onSelectPage} target={current + 1} content="Next" current={current} />;

  return (
    <section className="paginator">
      {previous}
      {buttons}
      {next}
    </section>
  );
};
