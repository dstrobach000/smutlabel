import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="text-left">
      <h1 className="m-0 mb-3 block w-full text-left text-2xl">
        <span className="smut-stretch-heading">About</span>
      </h1>
      <p className="m-0 mb-3 font-normal">
        SMUT (South Moravian Utility Tapes) is a small hardcore punk and DIY
        label focused on physical releases — primarily cassettes — and local
        scenes.
      </p>
      <p className="m-0 font-normal">
        No frills, no algorithms: tapes, flyers, and mailorder energy.
      </p>
    </div>
  );
}
