import type { Metadata } from "next";
import { ReleaseEntry } from "@/components/release-entry";
import { RELEASES } from "@/lib/releases";

export const metadata: Metadata = {
  title: "Releases",
};

export default function ReleasesPage() {
  return (
    <div className="text-left">
      <h1 className="m-0 mb-3 block w-full text-left text-2xl">
        <span className="smut-stretch-heading">Releases</span>
      </h1>
      <p className="m-0 mb-4 font-normal">Catalogue in order of appearance.</p>
      <hr className="smut-hr mb-5" />
      <ul className="m-0 list-none space-y-8 p-0">
        {RELEASES.map((release) => (
          <li key={release.catalog}>
            <ReleaseEntry release={release} />
          </li>
        ))}
      </ul>
    </div>
  );
}
