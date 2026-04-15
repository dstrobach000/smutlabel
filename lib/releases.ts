export type Release = {
  catalog: string;
  artist: string;
  title: string;
  coverSrc: string;
  /** e.g. "náklad 75ks" */
  edition: string;
  description: string;
  /** Bandcamp album/track ID for the embedded player (numeric string from the embed code). */
  bandcampId?: string;
  /** "album" or "track" — determines the embed URL path. Defaults to "album". */
  bandcampType?: "album" | "track";
};

export const RELEASES: Release[] = [
  {
    catalog: "SMT001",
    artist: "Alma Mater",
    title: "Flüst",
    coverSrc: "/images/releases/001_almamater_flust.jpg",
    edition: "náklad 75ks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    bandcampId: "",
    bandcampType: "album",
  },
];
