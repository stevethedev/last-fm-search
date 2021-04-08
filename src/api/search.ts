import axios from 'axios';

// Not a good way to store this, but this isn't a production application.
const API_KEY = 'ac4197870e456b0d4b6fddc5c77e8b3f';

// Root URL for the API.
const API_URL = 'http://ws.audioscrobbler.com/2.0/';

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

const parseArtist = (raw: RawArtist): Artist => ({
  mbid: raw.mbid,
  name: raw.name,
  url: raw.url,
  listeners: Number(raw.listeners),
  streamable: raw.streamable === '1',
  images: raw.image.reduce<Artist['images']>((acc, val) => {
    acc[val.size] = val['#text'];
    return acc;
  }, {
    small: null,
    medium: null,
    large: null,
    extralarge: null,
    mega: null,
  }),
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

const joinToString = (parameters: ApiParameters): string => Object.keys(parameters).map((name) => `${name}=${parameters[name]}`).join('&');

/**
 * Execute an anonymous search against the API
 */
export async function search(params: SearchParams): Promise<Results | null> {
  const parameters: ApiParameters = {
    method: 'artist.search',
    api_key: API_KEY,
    artist: params.artist,
    format: 'json',
    limit: `${params.limit ?? 10}`,
    page: `${params.page ?? 1}`,
  };

  const response = await axios.get(`${API_URL}?${joinToString(parameters)}`, { responseType: 'json' });

  const results: unknown = response?.data?.results;
  if (!results) {
    return null;
  }

  // Normally I'd do a better job of type-checking this.
  return parseResults(results as RawResults);
}

interface ApiParameters {
    method: string;
    // eslint-disable-next-line camelcase
    api_key: string;

    [key: string]: string;
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
