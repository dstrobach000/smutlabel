export type Release = {
  catalog: string;
  artist: string;
  title: string;
  coverSrc: string;
  /** Shown beside the cover (to the right on wide screens). */
  description: string;
};

export const RELEASES: Release[] = [
  {
    catalog: "SMT001",
    artist: "Alma Mater",
    title: "Flüst",
    coverSrc: "/images/releases/001_almamater_flust.jpg",
    description:
      "First SMUT tape: raw hardcore out of the snow line, basement-recorded and dubbed in small runs. Fiery guitars, stubborn drums, vocals that do not ask permission. Cassette only — no remorse, no remaster fantasy.",
  },
];
