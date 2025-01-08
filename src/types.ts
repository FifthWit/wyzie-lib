// Either IMDB or TMDB ID is required and if episode is provided, season is also required
export type SearchSubtitlesParams = (
  | { tmdb_id: number; imdb_id?: never }
  | { imdb_id: string; tmdb_id?: never }
) & {
  language?: string;
  format?: string;
  hi?: boolean;
} & (
  | { season: number; episode: number }
  | { season?: never; episode?: never }
);

// API response
export type SubtitleData = {
  id: string;
  url: string;
  format: string;
  isHearingImpaired: boolean;
  flagUrl: string;
  media: string;
  display: string;
  language: string;
};

// Used to construct the URL (ID required)
export type QueryParams = {
  id: string;
  season?: number;
  episode?: number;
  language?: string;
  format?: string;
  hi?: boolean;
}
