import React from 'react';
import styles from './Artist.module.css';
import { ArtistDetails } from '../api/artist';

interface Params extends React.HTMLProps<HTMLElement> {
  artist: ArtistDetails;
}

const ArtistDetails = ({ artist, ...rest }: Params): JSX.Element => (
  <section className={`${styles['artist-details']}${rest.className ?? ''}`}>
    {!artist.bio ? <></> : (
      <>
        <div className={styles['artist-details__publish-date']}>
          Published
          {artist.bio.published.toString()}
        </div>
        <div className={styles['artist-details__biography']}>{artist.bio.content}</div>
      </>
    )}
  </section>
);

const ArtistHeader = ({ artist, ...rest }: Params): JSX.Element => (
  <header className={`${styles['artist-header']} ${rest.className ?? ''}`}>
    <img src={artist.images.large ?? ''} alt={artist.name} />
    <span>{artist.name}</span>
    <span>
      {artist.listeners}
      {' '}
      Listeners
    </span>
  </header>
);

export const ArtistArticle = ({ artist, ...rest }: Params): JSX.Element => (
  <article className={`${styles['artist-article']} ${rest.className ?? ''}`}>
    <ArtistHeader className={styles['artist-article__header']} artist={artist} />
    <ArtistDetails className={styles['artist-article__body']} artist={artist} />
  </article>
);
