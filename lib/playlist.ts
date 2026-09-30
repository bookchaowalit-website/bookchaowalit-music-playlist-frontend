export type Mood = "Focus" | "Energy" | "Night";
export type Track = { id: string; title: string; artist: string; mood: Mood; duration: string; note: string };
export const MOODS = ["All", "Focus", "Energy", "Night"] as const;
export type MoodFilter = (typeof MOODS)[number];

export const TRACKS: Track[] = [
  { id: "compile", title: "Lo-fi compile", artist: "Book / Field Notes", mood: "Focus", duration: "3:12", note: "For long PR reviews and the quiet middle of a build." },
  { id: "bright", title: "Bright room", artist: "Small Signals", mood: "Energy", duration: "4:08", note: "A little lift for when the task needs a second start." },
  { id: "night", title: "After the deploy", artist: "Night Shift", mood: "Night", duration: "5:21", note: "Low light, one tab open, the work finally still." },
  { id: "tape", title: "Tape hiss / clear head", artist: "Soft Circuit", mood: "Focus", duration: "2:44", note: "A short loop for reading one more page without rushing." },
];

export function filterTracks(tracks: Track[], mood: MoodFilter, query: string): Track[] {
  const needle = query.trim().toLowerCase();
  return tracks.filter((track) => (mood === "All" || track.mood === mood) && `${track.title} ${track.artist} ${track.mood}`.toLowerCase().includes(needle));
}

/** "m:ss" or "h:mm:ss" to seconds; invalid input counts as 0. */
export function parseDuration(value: string): number {
  const parts = value.split(":").map((part) => Number(part));
  if (parts.length < 2 || parts.length > 3 || parts.some((n) => !Number.isInteger(n) || n < 0)) return 0;
  return parts.reduce((total, n) => total * 60 + n, 0);
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const ss = String(s).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}

export function playlistDuration(ids: string[], tracks: Track[] = TRACKS): number {
  return ids.reduce((sum, id) => sum + parseDuration(tracks.find((track) => track.id === id)?.duration ?? ""), 0);
}

export function toggleInPlaylist(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}

export function moveInPlaylist(ids: string[], id: string, delta: -1 | 1): string[] {
  const from = ids.indexOf(id);
  const to = from + delta;
  if (from < 0 || to < 0 || to >= ids.length) return ids;
  const next = [...ids];
  [next[from], next[to]] = [next[to], next[from]];
  return next;
}

/** Keeps only known track ids, without duplicates. */
export function parsePlaylist(raw: string | null, tracks: Track[] = TRACKS): string[] | null {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return null;
    const known = new Set(tracks.map((track) => track.id));
    return [...new Set(data.filter((id): id is string => typeof id === "string" && known.has(id)))];
  } catch {
    return null;
  }
}
