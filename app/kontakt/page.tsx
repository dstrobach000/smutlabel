import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
};

export default function KontaktPage() {
  return (
    <div className="text-left">
      <h1 className="m-0 mb-3 block w-full text-left text-2xl">
        <span className="smut-stretch-heading">Kontakt</span>
      </h1>
      <p className="m-0 mb-3 font-normal">
        Ak chceš kazetku napíš nám na —{" "}
        <a href="mailto:postmaster@smutlabel.monster">postmaster@smutlabel.monster</a>
      </p>
      <p className="m-0 mb-3 font-normal">
        Ak chceš vedieť aké koncerty plánujeme, pozri si{" "}
        <a href="https://instagram.com/stitchskindeep" target="_blank" rel="noopener noreferrer">
          @stitchskindeep
        </a>
      </p>
      <p className="m-0 font-normal">
        Ak máš s niečím problem napíš mi na —{" "}
        <a href="https://instagram.com/boilerhudak" target="_blank" rel="noopener noreferrer">
          @boilerhudak
        </a>
      </p>
    </div>
  );
}
