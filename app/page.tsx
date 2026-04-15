import { ReleaseEntry } from "@/components/release-entry";
import { RELEASES } from "@/lib/releases";

export default function Home() {
  return (
    <div className="text-left">
      <h1 className="sr-only">South Moravian Utility Tapes</h1>
      <h2 className="m-0 mb-3 block w-full text-left text-xl">
        <span className="smut-stretch-heading">Katalóg</span>
      </h2>
      <ul className="m-0 list-none space-y-10 p-0">
        {RELEASES.map((release) => (
          <li key={release.catalog}>
            <ReleaseEntry release={release} />
          </li>
        ))}
      </ul>
    </div>
  );
}
