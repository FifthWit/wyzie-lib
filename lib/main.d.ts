export declare function parseToVTT(subtitleUrl: string): Promise<string>;

export declare type QueryParams = {
    id: string;
    season?: number;
    episode?: number;
    language?: string;
    format?: string;
    hi?: boolean;
};

export declare function searchSubtitles(params: SearchSubtitlesParams): Promise<SubtitleData[]>;

export declare type SearchSubtitlesParams = ({
    tmdb_id: number;
    imdb_id?: never;
} | {
    imdb_id: string;
    tmdb_id?: never;
}) & {
    language?: string;
    format?: string;
    hi?: boolean;
} & ({
    season: number;
    episode: number;
} | {
    season?: never;
    episode?: never;
});

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
