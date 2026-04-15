interface BandcampPlayerProps {
  bandcampId: string;
  type?: "album" | "track";
}

export function BandcampPlayer({ bandcampId, type = "album" }: BandcampPlayerProps) {
  if (!bandcampId) return null;

  const src = `https://bandcamp.com/EmbeddedPlayer/${type}=${bandcampId}/size=large/bgcol=000000/linkcol=99ccff/tracklist=false/artwork=none/transparent=true/`;

  return (
    <iframe
      className="mt-4 w-full border-0"
      style={{ height: 120 }}
      src={src}
      seamless
      title="Bandcamp player"
    />
  );
}
