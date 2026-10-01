"use client";

import { useMemo, useState } from "react";
import { filterTracks, formatDuration, MOODS, moveInPlaylist, parsePlaylist, playlistDuration, playlistText, toggleInPlaylist, TRACKS, type MoodFilter } from "@/lib/playlist";
import { useStoredState } from "@/lib/use-stored-state";

const EMPTY: string[] = [];

function Waveform() {
  return (
    <svg className="waveform" viewBox="0 0 640 180" role="img" aria-label="Decorative listening waveform">
      <path d="M0 94h28l10-44 12 85 14-116 16 136 16-75 15 38 15-18 18 10 16-34 15 58 17-92 16 126 18-72 16 28 16-17 16 6 14-22 16 51 17-76 16 98 18-50 17 22 17-14 16 4 15-30 16 54 17-90 16 122 17-65 17 29 16-19 18 8 16-32 15 62 16-103 18 128 16-77 16 34 17-21 16 9 16-35 16 56 15-70 17 92 16-50 16 24 16-17 18 8 16-41 16 57 16-65 17 76h25" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
    </svg>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [mood, setMood] = useState<MoodFilter>("All");
  const [selectedId, setSelectedId] = useState(TRACKS[0].id);
  const [playlist, setPlaylist] = useStoredState("music-playlist-v1", EMPTY, parsePlaylist);
  const visible = useMemo(() => filterTracks(TRACKS, mood, query), [mood, query]);
  const selected = TRACKS.find((track) => track.id === selectedId) ?? visible[0] ?? TRACKS[0];
  const inPlaylist = playlist.includes(selected.id);
  const totalTime = formatDuration(playlistDuration(playlist));
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const copyOrder = async () => {
    try {
      await navigator.clipboard.writeText(playlistText(playlist));
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    window.setTimeout(() => setCopyState("idle"), 1800);
  };

  return (
    <main className="listening-shell">
      <div className="listening-frame">
        <header className="listening-topbar">
          <a href="https://bookchaowalit.com" className="record-mark" aria-label="Bookchaowalit home"><span>B</span> / PLAY</a>
          <span>LOCAL LISTENING SHELF</span>
          <span>{TRACKS.length} TRACKS / NO STREAM</span>
        </header>

        <section className="listening-intro">
          <div>
            <h1>Pick a frequency.<br /><em>Keep the room.</em></h1>
            <p>A small shelf for the sounds that make focused work feel less like an empty tab.</p>
          </div>
          <div className="dial" aria-hidden="true"><span>03</span><small>LISTENING<br />SHELF</small></div>
        </section>

        <section className="playlist-workbench" aria-label="Curated music playlist">
          <aside className="track-shelf">
            <div className="shelf-heading"><div><span className="eyebrow">THE SHELF</span><strong>Choose a track</strong></div><span>{visible.length} shown</span></div>
            <div className="shelf-controls">
              <label><span className="sr-only">Search tracks</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a track" /></label>
              <div className="mood-tabs" role="group" aria-label="Filter by mood">
                {MOODS.map((item) => <button key={item} type="button" aria-pressed={mood === item} className={mood === item ? "active" : ""} onClick={() => setMood(item)}>{item}</button>)}
              </div>
            </div>
            <div className="track-list">
              {visible.length ? visible.map((track, index) => (
                <button key={track.id} type="button" className={`track-row${selected.id === track.id ? " selected" : ""}`} onClick={() => setSelectedId(track.id)} aria-pressed={selected.id === track.id}>
                  <span className="track-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="track-copy"><strong>{track.title}</strong><small>{track.artist}</small></span>
                  <span className="track-mood">{track.mood}</span>
                  <span className="track-duration">{track.duration}</span>
                </button>
              )) : <p className="empty-shelf">No track matches this shelf.</p>}
            </div>
          </aside>

          <article className="listening-card">
            <div className="card-topline"><span>NOW STAGED</span><span>CLIENT-SIDE CATALOG</span></div>
            <div className="waveform-wrap"><Waveform /><span className="waveform-dot" aria-hidden="true" /></div>
            <div className="staged-track"><span className={`mood-mark ${selected.mood.toLowerCase()}`} /> <span>{selected.mood} / {selected.duration}</span></div>
            <h2>{selected.title}</h2>
            <p className="artist-line">{selected.artist}</p>
            <p className="track-note">{selected.note}</p>
            <button type="button" className="playlist-toggle" onClick={() => setPlaylist((ids) => toggleInPlaylist(ids, selected.id))} aria-pressed={inPlaylist}>{inPlaylist ? "In your playlist ✓ — remove" : "Add to playlist +"}</button>
            <div className="card-rule" />
            <p className="honesty-note"><b>READ BEFORE PLAY</b><br />This portfolio surface stages a curated track card. It does not attach an audio stream or music provider.</p>
          </article>
        </section>

        <section className="playlist-panel" aria-labelledby="playlist-title">
          <div className="shelf-heading"><div><span className="eyebrow">YOUR PLAYLIST</span><strong id="playlist-title">Tonight&apos;s running order</strong></div><span aria-live="polite">{playlist.length} {playlist.length === 1 ? "track" : "tracks"} · {totalTime}</span></div>
          {playlist.length === 0 ? <p className="empty-shelf">Stage a track and add it to start a running order. Saved in this browser only.</p> : <ol className="playlist-list">{playlist.map((id, index) => { const track = TRACKS.find((item) => item.id === id); if (!track) return null; return <li key={id}><span className="track-index">{String(index + 1).padStart(2, "0")}</span><span className="track-copy"><strong>{track.title}</strong><small>{track.artist} · {track.duration}</small></span><span className="playlist-actions"><button type="button" onClick={() => setPlaylist((ids) => moveInPlaylist(ids, id, -1))} disabled={index === 0} aria-label={`Move ${track.title} up`}>↑</button><button type="button" onClick={() => setPlaylist((ids) => moveInPlaylist(ids, id, 1))} disabled={index === playlist.length - 1} aria-label={`Move ${track.title} down`}>↓</button><button type="button" onClick={() => setPlaylist((ids) => toggleInPlaylist(ids, id))} aria-label={`Remove ${track.title} from playlist`}>✕</button></span></li>; })}</ol>}
          {playlist.length > 0 && <div className="playlist-export"><button type="button" onClick={copyOrder}>{copyState === "copied" ? "Copied running order" : copyState === "failed" ? "Copy blocked by browser" : "Copy running order"}</button><span className="sr-only" role="status">{copyState === "copied" ? "Running order copied to the clipboard." : copyState === "failed" ? "The browser blocked clipboard access." : ""}</span></div>}
        </section>

        <footer className="listening-footer"><span>BOOK / DEV TOOLS</span><span>SEARCH · FILTER · STAGE · QUEUE</span></footer>
      </div>
    </main>
  );
}
