import { describe, expect, it } from "vitest";
import { filterTracks, formatDuration, moveInPlaylist, parseDuration, parsePlaylist, playlistDuration, toggleInPlaylist, TRACKS } from "./playlist";

describe("filterTracks", () => {
  it("combines mood and case-insensitive search", () => {
    expect(filterTracks(TRACKS, "Focus", "").map((t) => t.id)).toEqual(["compile", "tape"]);
    expect(filterTracks(TRACKS, "All", "NIGHT").map((t) => t.id)).toEqual(["night"]);
    expect(filterTracks(TRACKS, "Energy", "tape")).toEqual([]);
  });
});

describe("durations", () => {
  it("parses and formats m:ss and h:mm:ss", () => {
    expect(parseDuration("3:12")).toBe(192);
    expect(parseDuration("1:00:05")).toBe(3605);
    expect(parseDuration("abc")).toBe(0);
    expect(formatDuration(192)).toBe("3:12");
    expect(formatDuration(3605)).toBe("1:00:05");
  });

  it("totals a playlist and ignores unknown ids", () => {
    expect(playlistDuration(["compile", "tape", "missing"])).toBe(192 + 164);
  });
});

describe("playlist editing", () => {
  it("toggles and reorders ids", () => {
    expect(toggleInPlaylist(["a"], "b")).toEqual(["a", "b"]);
    expect(toggleInPlaylist(["a", "b"], "a")).toEqual(["b"]);
    expect(moveInPlaylist(["a", "b", "c"], "c", -1)).toEqual(["a", "c", "b"]);
    expect(moveInPlaylist(["a", "b"], "a", -1)).toEqual(["a", "b"]);
  });

  it("parses stored playlists defensively", () => {
    expect(parsePlaylist(null)).toBeNull();
    expect(parsePlaylist("{")).toBeNull();
    expect(parsePlaylist(JSON.stringify(["night", "night", 3, "ghost", "tape"]))).toEqual(["night", "tape"]);
  });
});
