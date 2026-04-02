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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];
