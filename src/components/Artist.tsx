import React from 'react';
import { Artist } from '../api/search';

interface Params {
  artist: Artist;
}

export const ArtistArticle = ({ artist }: Params): JSX.Element => (
  <article className="artist-article">
    <header className="artist-article__header">
      <img src={artist.images.medium ?? ''} alt={artist.name} />
      <span>{artist.name}</span>
    </header>
    <section className="artist-article__body">
      <span>
        {artist.listeners}
        {' '}
        listeners
      </span>
    </section>
  </article>
);
