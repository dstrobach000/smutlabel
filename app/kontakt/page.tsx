import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
};

export default function KontaktPage() {
  return (
    <div className="text-left">
      <h1 className="smut-stretch-h1 mb-3 text-left text-2xl">Kontakt</h1>
      <p className="m-0 mb-3 font-normal">
        Orders, trades, demos, and vague threats:
      </p>
      <p className="m-0 font-normal">
        <a href="mailto:info@smutlabel.monster">info@smutlabel.monster</a>
      </p>
    </div>
  );
}
