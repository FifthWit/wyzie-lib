async function constructUrl({
  tmdb_id,
  imdb_id,
  season,
  episode,
  language,
  format,
  hi
}) {
  const url = new URL("https://sub.wyzie.ru/search");
  const queryParams = {
    id: String(tmdb_id || imdb_id),
    season,
    episode,
    language,
    format,
    hi
  };
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== void 0) {
      url.searchParams.append(key, String(value));
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
    if (!blocks.some((block) => timestampRegex.test(block))) {
      throw new Error("Invalid subtitle format: not SRT");
    }
    const vttLines = ["WEBVTT", ""];
    for (const block of blocks) {
      const lines = block.split("\n").map((line) => line.trim());
      const timestampIndex = lines.findIndex((line) => timestampRegex.test(line));
      if (timestampIndex === -1 || lines.length <= timestampIndex + 1)
        continue;
      let timestampLine = lines[timestampIndex].replace(/[,.](?=\s*-->)/, "").replace(/[,.]$/, "").replace(/,(\d{3})/g, ".$1");
      const textLines = lines.slice(timestampIndex + 1).filter((line) => line && !/^\d+$/.test(line));
      if (textLines.length === 0)
        continue;
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
  parseToVTT,
  searchSubtitles
};
