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
        Orders, trades, demos, and vague threats:
      </p>
      <p className="m-0 font-normal">
        <a href="mailto:info@smutlabel.monster">info@smutlabel.monster</a>
      </p>
    </div>
  );
}
