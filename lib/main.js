const config = {
  baseUrl: "https://libre-subs.fifthwit.net"
};
function configure(options) {
  if (options.baseUrl) {
    config.baseUrl = options.baseUrl.replace(/\/$/, "");
  }
}
async function constructUrl({
  tmdb_id,
  imdb_id,
  season,
  episode,
  encoding,
  language,
  format,
  source,
  hi,
  ...extraParams
}) {
  const url = new URL(`${config.baseUrl}/search`);
  const queryParams = {
    id: String(tmdb_id || imdb_id),
    season,
    episode,
    encoding: Array.isArray(encoding) ? encoding.join(",") : encoding,
    language: Array.isArray(language) ? language.join(",") : language,
    format: Array.isArray(format) ? format.join(",") : format,
    source: Array.isArray(source) ? source.join(",") : source,
    hi
  };
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== void 0) {
      url.searchParams.append(key, String(value));
    }
  });
  Object.entries(extraParams).forEach(([key, value]) => {
    if (value !== void 0) {
      if (Array.isArray(value)) {
        url.searchParams.append(key, value.join(","));
      } else {
        url.searchParams.append(key, String(value));
      }
    }
  });
  return url;
}
async function fetchSubtitles(url) {
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
async function searchSubtitles(params) {
  try {
    const url = await constructUrl(params);
    return await fetchSubtitles(url);
  } catch (error) {
    throw new Error(`Error fetching subtitles: ${error}`);
  }
}
async function parseToVTT(subtitleUrl) {
  try {
    const response = await fetch(subtitleUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch subtitle content: ${response.status}`);
    }
    const content = await response.text();
    const normalizedContent = content.replace(/\r\n|\r/g, "\n").trim();
    const blocks = normalizedContent.split(/\n\n+/);
    const timestampRegex = /^\d{1,2}:\d{2}:\d{2}[,.]\d{3}\s*-->\s*\d{1,2}:\d{2}:\d{2}[,.]\d{3}$/;
    const hasValidSRTFormat = blocks.some((block) => {
      const lines = block.split("\n").map((line) => line.trim());
      return lines.some((line) => timestampRegex.test(line));
    });
    if (!hasValidSRTFormat) {
      throw new Error("Invalid subtitle format: not SRT");
    }
    const vttLines = ["WEBVTT", ""];
    for (const block of blocks) {
      const lines = block.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
      if (lines.length < 2)
        continue;
      const timestampIndex = lines.findIndex((line) => timestampRegex.test(line));
      if (timestampIndex === -1)
        continue;
      const textLines = lines.slice(timestampIndex + 1).filter((line) => !/^\d+$/.test(line));
      if (textLines.length === 0)
        continue;
      let timestampLine = lines[timestampIndex];
      timestampLine = timestampLine.replace(/[,.](?=\s*-->)/, "").replace(/[,.]$/, "").replace(/,(\d{3})/g, ".$1");
      vttLines.push(`${timestampLine}
${textLines.join("\n")}
`);
    }
    return vttLines.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n\n";
  } catch (error) {
    console.error("Error in parseToVTT:", error);
    throw error;
  }
}
export {
  configure,
  parseToVTT,
  searchSubtitles
};
