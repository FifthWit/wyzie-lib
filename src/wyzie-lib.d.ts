declare module "wyzie-lib" {
  export interface SearchSubtitlesParams {
    tmdb_id?: number;
    imdb_id?: number;
    season?: number;
    episode?: number;
    language?: string;
    format?: string;
    hi?: boolean;
  }

  export interface SubtitleData {
    id: string;
    url: string;
    format: string;
    isHearingImpaired: boolean;
    flagUrl: string;
    media: string;
    display: string;
    language: string;
  }

  export function searchSubtitles(params: SearchSubtitlesParams): Promise<SubtitleData[]>;
  export function parseToVTT(url: string): Promise<string>;
}
