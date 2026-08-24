---
name: Listening Shelf
description: A midnight listening room for choosing a track from a local curated shelf.
---

# Design System: Listening Shelf

## Overview

The product is a small local track shelf, not a streaming service. Its world is a midnight listening room: the visitor searches a record shelf, filters by mood, chooses one track, and reads the note staged beside its waveform. The empty streaming boundary stays visible so the composition never overclaims.

## Colors

- **Night** `#171421`: page ground and quiet negative space.
- **Violet** `#28203c`: shelf and staged-track surfaces.
- **Paper** `#f1ecdf`: primary reading ink.
- **Mint** `#91e1be`: listening signal, focus, and selected state.
- **Coral** `#f27863`: track markers and transmission boundary.
- **Line** `#4b4260`: record-shelf rules.

Mint is the scarce “playable” signal; coral marks mood or limits. Neither becomes a general gradient or decoration.

## Typography

Geist Sans carries the large, human headline and track titles. Geist Mono is reserved for record labels, mood metadata, durations, and the local-only boundary. The italic serif in the hero and selected note is the only warm contrast to the instrument voice.

## Layout

The opening statement and circular dial lead into a two-column listening workbench: a searchable, filterable shelf on the left and the selected track on the right. At 780px the workbench stacks, keeping the track list and staged note in a single reading order without horizontal scrolling.

## Elevation & Depth

Depth comes from midnight/violet tonal separation, one-pixel shelf rules, and the bordered waveform stage. No shadows, glass, or decorative card stack is needed; the selected row and signal colors provide state.

## Shapes

Rows and panels are square editorial surfaces. The dial, waveform dot, and mood marks are circular because they reference physical listening equipment. Controls use compact rectangular tabs, never generic pills.

## Components

- **Track shelf:** search field, mood tabs, and authored track rows with index, title, duration, and mood.
- **Staged track:** waveform, selected title, artist, room note, and catalog-only honesty note.
- **Signal states:** mint focus/selection, coral mood marker, and an empty shelf message for no matches.

## Do's and Don'ts

- Do make selecting a track feel like placing a record on a listening stand.
- Do keep the no-audio boundary explicit.
- Do reserve mint for meaningful listening state.
- Don't add fake playback controls, provider logos, or streaming claims.
- Don't flatten the page into a generic dark dashboard or a repeated card grid.
