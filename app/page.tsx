import { ReleaseEntry } from "@/components/release-entry";
import { RELEASES } from "@/lib/releases";

export default function Home() {
  const first = RELEASES[0];
  return (
    <div className="text-left">
      <h1 className="sr-only">South Moravian Utility Tapes</h1>
      <p className="m-0 mb-4 font-normal">
        Hardcore punk and DIY music on cassette. Tapes from the south, noise
        for the patient.
      </p>
      <hr className="smut-hr mb-5" />
      <h2 className="m-0 mb-3 block w-full text-left text-xl">
        <span className="smut-stretch-heading">Catalog</span>
      </h2>
      {first ? <ReleaseEntry release={first} /> : null}
    </div>
  );
}
