export declare function parseToVTT(subtitleUrl: string): Promise<string>;

export declare interface QueryParams {
    id: string;
    season?: number;
    episode?: number;
    language?: string;
    format?: string;
    hi?: boolean;
}

export declare function searchSubtitles(params: SearchSubtitlesParams): Promise<SubtitleData[]>;

export declare interface SearchSubtitlesParams {
    tmdb_id?: number;
    imdb_id?: number;
    season?: number;
    episode?: number;
    language?: string;
    format?: string;
    hi?: boolean;
}

export declare type SubtitleData = {
    id: string;
    url: string;
    format: string;
    isHearingImpaired: boolean;
    flagUrl: string;
    media: string;
    display: string;
    language: string;
};

export { }
