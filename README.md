<p align="center">
  <a href="https://sub.wyzie.ru/">
    <img src="https://i.postimg.cc/L5ppKYC5/cclogo.png" height="120">
    <h1 align="center">Wyzie Lib</h1>
  </a>
</p>

Wyzie Lib is a package made for easily implementing [Wyzie Subs](https://sub.wyzie.ru) into your
project without all the fuss. [Read our source code!](https://github.com/itzcozi/wyzie-lib)

<sup>New VTT Parser!</sup>

## Features

- **Fast**: This package was written in Vite with TypeScript, so it's fast and reliable.
- **Simple**: Just one function for searching subtitles using Wyzie Subs API.
- **VTT Parser**: Convert SRT subtitles to VTT format quickly.
- **Open-Source**: The API and package are open-source.

## Installation

**NPM**

```bash
npm install wyzie-lib
```

**PNPM**

```bash
pnpm install wyzie-lib
```

**Yarn**

```bash
yarn add wyzie-lib
```

## Usage

```ts
import { type SubtitleData, searchSubtitles, parseToVTT } from "wyzie-lib";

// Fetches all subtitles for the media with the TMDB ID 286217
const data: SubtitleData[] = await searchSubtitles({ tmdb_id: 286217, format: "srt" });
console.log(data[0].id); // Prints the ID of the first subtitle object

// Converts the first subtitle from SRT to VTT format
const vttContent = await parseToVTT(data[0].url); // Passes the first subtitle URL
console.log(vttContent); // Prints the raw VTT content
```

Check out [demo.html](https://raw.githubusercontent.com/itzCozi/wyzie-lib/refs/heads/main/demo.html)
for a working example using the VTT parser.

### Parameters

| Parameter               | Name              | Description                                                                               |
| ----------------------- | ----------------- | ----------------------------------------------------------------------------------------- |
| **tmdb_id** - _number_  | TmdbId            | The TMDB ID of the movie or TV show. _(tmdb_id or imdb_id is required)_                   |
| **imdb_id** - _number_  | ImdbId            | The IMDB ID of the movie or TV show. _(imdb_id or tmdb_id is required)_                   |
| **format** - _string_   | format            | The file format of the subtitles returned. _(srt, ass, vtt, txt, sub, mpl, webvtt, dfxp)_ |
| **season** - _number_   | season            | Disired season of subtites _(this requires episode parameter aswell)_                     |
| **episode** - _number_  | episode           | The episode of the given season.                                                          |
| **language** - _string_ | language          | The ISO 3166 code of the provided subtitles.                                              |
| **hi** - _boolean_      | isHearingImpaired | A boolean indicating if the subtitles are hearing impaired.                               |

### Types

- **SearchSubtitlesParams**: All valid parameters recognized by the API.
- **QueryParams**: All parameters (optional and required) available for the wyzie-subs API.
- **SubtitleData**: All returned values from the API with their respective types.

Check out the types.ts file
[here](https://raw.githubusercontent.com/itzCozi/wyzie-lib/refs/heads/main/src/types.ts).

<hr />

<sup>
  Created by <a href="https://github.com/itzcozi" alt="github" title="itzCozi on Github">BadDeveloper</a> with 💙
</sup>
