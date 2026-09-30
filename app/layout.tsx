import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Playlist | Bookchaowalit",
  description: "Track list with moods.",
  keywords: ["music-playlist", "catalog"],
  authors: [{ name: "Bookchaowalit", url: "https://bookchaowalit.com" }],
  creator: "Bookchaowalit",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    title: "Music Playlist | Bookchaowalit",
    description: "Track list with moods.",
    siteName: "Bookchaowalit",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/*
          THESIS: make a playlist feel like a listening room and a chosen track feel staged, not streamed.
          OWN-WORLD: midnight violet, mint signal ink, coral markers, and a ruled record shelf carry the page.
          STORY: search the shelf, filter by mood, choose one track, and read the note for the room it belongs to.
          FIRST VIEWPORT: the shelf thesis, no-stream boundary, searchable track rows, and staged-track panel arrive together.
          FORM: record labels, waveforms, dial marks, and selected rows define every control and state.
          SEED: 68794d58 · assigned direction 4 · operate mode.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
        */}
        {children}
      </body>
    </html>
  );
}
