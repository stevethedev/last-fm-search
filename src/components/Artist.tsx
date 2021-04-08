import React from 'react';
import { Artist } from '../api/search';
import styles from './Artist.module.css';

interface Params extends React.HTMLProps<HTMLElement> {
  artist: Artist;
}

export const ArtistArticle = ({ artist, ...rest }: Params): JSX.Element => (
  <article className={`${styles['artist-article']} ${rest.className ?? ''}`}>
    <header className={styles['artist-article__header']}>
      <img src={artist.images.medium ?? ''} alt={artist.name} />
      <span>{artist.name}</span>
    </header>
    <section className={styles['artist-article__body']}>
      <span>
        {artist.listeners}
        {' '}
        listeners
      </span>
    </section>
  </article>
);
