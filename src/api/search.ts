import { httpGet } from './request';

export interface SearchParams {
    /**
     * The artist's name to search.
     */
    artist: string;

    /**
     * The number of results to fetch per page.
     * @default 30
     */
    limit?: number;

    /**
     * The page number to fetch.
     * @default 1
     */
    page?: number;
}

/**
 * The parsed search-results from the server.
 */
export interface Results {
    meta: Metadata;
    artists: Artist[];
}

/**
 * Provides information about an individual artist.
 */
export interface Artist {
    images: Record<ImageSize, string | null>;
    listeners: number;
    mbid: string;
    name: string;
    streamable: boolean;
    url: string;
}

/**
 * Provides metadata about the response.
 */
export interface Metadata {
    page: number;
    pageLen: number;
    pageCount: number;
    numResults: number;
}

export type ImageSize = 'small' | 'medium' | 'large' | 'extralarge' | 'mega';
export const parseImages = (rawImages: RawImage[]): Record<ImageSize, string | null> => rawImages.reduce<Artist['images']>((acc, val) => {
  acc[val.size] = val['#text'];
  return acc;
}, {
  small: null,
  medium: null,
  large: null,
  extralarge: null,
  mega: null,
});

const parseArtist = (raw: RawArtist): Artist => ({
  mbid: raw.mbid,
  name: raw.name,
  url: raw.url,
  listeners: Number(raw.listeners),
  streamable: raw.streamable === '1',
  images: parseImages(raw.image),
});

const parseMeta = (raw: RawResults): Results['meta'] => {
  const numResults = Number(raw['opensearch:totalResults']);
  const page = Number(raw['opensearch:Query'].startPage);
  const pageLen = Number(raw['opensearch:itemsPerPage']);
  const pageCount = Math.ceil(numResults / pageLen);

  return {
    numResults, page, pageLen, pageCount,
  };
};

const parseResults = (results: RawResults): Results => ({
  artists: results.artistmatches.artist.map(parseArtist),
  meta: parseMeta(results),
});

/**
 * Execute an anonymous search against the API
 */
export async function search(params: SearchParams): Promise<Results | null> {
  const data = await httpGet({
    method: 'artist.search',
    artist: params.artist,
  });

  // Normally I'd do a better job of type-checking this.
  const results = (data as { results?: RawResults } | null)?.results;
  return results ? parseResults(results) : null;
}

interface RawImage {
    '#text': string;
    size: ImageSize;
}

interface RawArtist {
    image: RawImage[];
    listeners: string;
    mbid: string;
    name: string;
    streamable: string;
    url: string;
}

interface RawResults {
    artistmatches: {
        artist: RawArtist[];
    }
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
