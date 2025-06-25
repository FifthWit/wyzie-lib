/**
 * Type for the configuration options for the library.
 */
export declare type ConfigurationOptions = {
    /** The API's hostname (default: sub.wyzie.ru) */
    baseUrl: string;
};

/**
 * Configure the library settings.
 *
 * @param {ConfigurationOptions} options - Config options for the library.
 * @throws {Error} Throws an error if the baseUrl is not provided.
 */
export declare function configure(options: ConfigurationOptions): void;

/**
 * Parses subtitle content from a URL to VTT format.
 *
 * @param {string} subtitleUrl - The URL of the subtitle to parse.
 * @returns {Promise<string>} A promise that resolves to the subtitle content in VTT format.
 * @throws {Error} Throws an error if fetching or parsing the subtitle content fails.
 */
export declare function parseToVTT(subtitleUrl: string): Promise<string>;

/**
 * Parameters used to construct the URL for subtitle search (requires an ID).
 */
export declare type QueryParams = {
    /** Unique identifier (either TMDB or IMDB ID). */
    id: string;
    /** Season number if the content is a series. */
    season?: number;
    /** Episode number if the content is a series. */
    episode?: number;
    /** Encoding of the subtitle files. */
    encoding?: string;
    /** ISO 3166 code of the subtitle desired. */
    language?: string;
    /** Which subtitle file format you want */
    format?: string;
    /** Determines if you get a hearing impaired subtitles */
    hi?: boolean;
    /** The source where the subtitle will be scraped from. */
    source?: string;
};

/**
 * Searches for subtitles based on the provided parameters.
 *
 * @param {SearchSubtitlesParams} params - The parameters for searching: SearchSubtitlesParams.
 * @returns {Promise<SubtitleData[]>} A promise that resolves to an array of subtitle data.
 * @throws {Error} Throws an error if fetching subtitles fails or something goes wrong.
 */
export declare function searchSubtitles(params: SearchSubtitlesParams): Promise<SubtitleData[]>;

/**
 * Parameters for searching subtitles.
 * Either IMDB or TMDB ID is required and if episode is provided, season is also required.
 */
export declare type SearchSubtitlesParams = (
/** The TMDB ID of the media you want subtitles for (either TMDB or IMDB ID). */
    {
    tmdb_id: number;
    imdb_id?: never;
}
/** The IMDB ID of the media you want subtitles for (either TMDB or IMDB ID). */
| {
    imdb_id: string;
    tmdb_id?: never;
}) & {
    /** ISO 3166 code or codes of the subtitle desired. */
    language?: string | string[];
    /** The subtitle file's character encoding or encodings.  */
    encoding?: string | string[];
    /** Which subtitle file format(s) you want. */
    format?: string | string[];
    /** Determines if you get hearing impaired subtitles. */
    hi?: boolean;
    /** The source where the subtitle where be scraped. */
    source?: string;
    /** Additional parameters that can be used for filtering or other purposes. */
    [key: string]: any;
} & (
/** The number of the desired season you want subtitles for. */
    {
    season: number;
    episode: number;
}
/** The number of the desired episode you want subtitles for. */
| {
    season?: never;
    episode?: never;
});

/**
 * Data structure representing a single subtitle object.
 */
export declare type SubtitleData = {
    /** Unique identifier (either TMDB or IMDB ID). */
    id: string;
    /** The subtitle file's URL. */
    url: string;
    /** The format of the subtitle file. */
    format: string;
    /** The subtitle file's character encoding. (UTF-8, ASCII, ETC) */
    encoding: string;
    /** Boolean indicating if the subtitle's is hearing impaired. */
    isHearingImpaired: boolean;
    /** URL to a PNG of the flag of the subtitle's language. */
    flagUrl: string;
    /** The name/title of the media. */
    media: string;
    /** The display language; Example: English. */
    display: string;
    /** ISO 3166 code; Example: en (2 alphabetic letters). */
    language: string;
    /** The subtitle's source. */
    source: number;
};

export { }
