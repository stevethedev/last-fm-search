import React from 'react';
import { format } from 'date-fns';
import styles from './Artist.module.css';
import { ArtistDetails } from '../api/artist';

interface Params extends React.HTMLProps<HTMLElement> {
  artist: ArtistDetails;
}

const ArtistDetails = ({ artist, ...rest }: Params): JSX.Element => (
  <section className={`${styles['artist-details']} ${rest.className ?? ''}`}>
    {!artist.bio ? <></> : (
      <>
        <div className={styles['artist-details__publish-date']}>
          Published
          {' '}
          {format(artist.bio.published, 'PP \' at \' p')}
        </div>
        {/* eslint-disable-next-line react/no-danger */}
        <div className={styles['artist-details__biography']} dangerouslySetInnerHTML={{ __html: artist.bio.content }} />
      </>
    )}
  </section>
);

const ArtistHeader = ({ artist, ...rest }: Params): JSX.Element => (
  <header className={`${styles['artist-header']} ${rest.className ?? ''}`}>
    <img className={styles['artist-header__image']} src={artist.images.large ?? ''} alt={artist.name} />
    <div className={styles['artist-header__text']}>
      <span className={styles['artist-header__name']}>{artist.name}</span>
      <span className={styles['artist-header__listeners']}>
        {artist.listeners}
        {' '}
        Listeners
      </span>
    </div>
  </header>
);

export const ArtistArticle = ({ artist, ...rest }: Params): JSX.Element => (
  <article className={`${styles['artist-article']} ${rest.className ?? ''}`}>
    <ArtistHeader className={styles['artist-article__header']} artist={artist} />
    <ArtistDetails className={styles['artist-article__body']} artist={artist} />
  </article>
);
