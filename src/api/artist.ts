import { httpGet } from './request';
import { Artist, parseImages } from './search';

export interface SearchParams {
  /**
   * The artiest name.
   */
  artist: string;
}

/**
 * The parsed search-results from the server.
 */
export interface Results {
  artist: ArtistDetails;
}

/**
 * Provides information about an individual artist.
 */
export interface ArtistDetails extends Artist {
  onTour?: boolean;
  plays?: number;
  bio?: {
    published: Date;
    summary: string;
    content: string;
  };
}

export type ImageSize = 'small' | 'medium' | 'large' | 'extralarge' | 'mega';

const parseArtist = (raw: RawArtistDetails): ArtistDetails => ({
  images: parseImages(raw.image),
  mbid: raw.mbid,
  name: raw.name,
  streamable: raw.streamable === '1',
  onTour: raw.ontour === '1',
  url: raw.url,
  listeners: Number(raw.stats.listeners),
  plays: Number(raw.stats.playcount),
  bio: {
    published: new Date(raw.bio.published),
    summary: raw.bio.summary,
    content: raw.bio.content,
  },
});

const parseResults = (results: RawResults): Results => ({
  artist: parseArtist(results.artist),
});

/**
 * Execute an anonymous search against the API
 */
export async function getInfo(params: SearchParams): Promise<Results | null> {
  const results = await httpGet({
    method: 'artist.getInfo',
    artist: params.artist,
  });

  // Normally I'd do a better job of type-checking this.
  return results ? parseResults(results as RawResults) : null;
}

interface RawImage {
  '#text': string;
  size: ImageSize;
}

interface RawTag {
  name: string;
  url: string;
}

interface RawArtistDetails {
  name: string;
  mbid: string;
  url: string;
  image: RawImage[];
  streamable: string;
  ontour: string;
  stats: {
    listeners: string;
    playcount: string;
  };
  similar: {
    artist: Artist[];
  };
  tags: { tag: RawTag[]; };
  bio: {
    published: string;
    summary: string;
    content: string;
  }
}

interface RawResults {
  artist: RawArtistDetails;
  'opensearch:Query': {
    '#text': string;
    role: 'request';
    searchTerms: string;
    startPage: string;
  }
  'opensearch:itemsPerPage': string;
  'opensearch:startIndex': string;
  'opensearch:totalResults': string;
}
