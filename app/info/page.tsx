import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Info",
};

export default function InfoPage() {
  return (
    <div className="text-left">
      <h1 className="m-0 mb-3 block w-full text-left text-2xl">
        <span className="smut-stretch-heading">Info</span>
      </h1>

      <Image
        src="/images/misc/info.jpg"
        alt="SMUT"
        width={600}
        height={400}
        className="mb-4 h-auto w-full max-w-[600px]"
        sizes="(max-width: 640px) 100vw, 600px"
      />

      <p className="m-0 mb-3 font-normal">
        SMUT alebo South Moravian Utility Tapes (Jihomoravské užitkové pásky) je
        nezávislé DIY vydavateľstvo alternatívnej hudby, vedené a zastrešované
        booking kolektívom Stitch, sídliacim v Brne. Stitch kolektív začal
        s produkciou DIY koncertov v decembri 2022, pod pôvodným menom Hlubna
        (prebrané podľa názvu chemického výrobného družstva, na ktorého budovu
        sme videli z dvora nášho pôvodného venue Vitamin). Meno sme po štyroch
        koncertoch zmenili, lebo sa to plietlo s menom olomouckého kolektívu
        Hlubina (ktorý milujeme). Z Vitaminu sme sa v auguste 2023 museli kvôli
        plánovanej rekonštruckii vysťahovať. Bez Vitaminu a ľudí, ktorí nám
        poskytli platformu na realizáciu DIY koncertov, by sme tu dnes neboli
        a za to ich extrémne ceníme.
      </p>

      <p className="m-0 mb-3 font-normal">
        Na krátky čas sme sa presunuli do SPOTu (ktorý tiež milujeme), kde nám
        bolo veľmi ochotne poskytnuté dočasné zázemie a v novembri 2023 sme sa
        presunuli do Fraktalu na Štefánikovej ulici, kde sa momentálne nachádza
        náš dlhodobý domov. Od začiatku bijeme partiu s našou sesterskou promo
        crew VPN (Vlasatí pseudoskinheadi netalentovaní), ktorá organizuje
        hardcorove shows v Brne od roku 2018. Naša činnosť je nezávislá
        a nekomerčná.
      </p>

      <p className="m-0 mb-3 font-normal">
        Vďaka vybudovanému zázemiu, prejavenému záujmu od brnenskej komunity
        a dobrovoľným príspevkom ľudí, ktorých bavia naše shows sme sa rozhodli
        v marci 2026 založiť SMUT. Rovnako ako pri bookovaní sa aj pri vydávaní
        hudby sústredíme na projekty, ktoré nás bavia a zdieľajú naše morálne
        presvedčenia. Nebookujeme a nevydávame pre profit ani pre nikoho ego.
      </p>

      <p className="m-0 mb-3 font-normal underline">
        Všetky kazety sú dostupné fyzicky na STITCH akciách alebo po dohode
        skrz fyzické predanie v Brne / Zásilkovnu vrámci ČR a SR.
      </p>

      <hr className="smut-hr my-4" />

      <p className="m-0 mb-3 font-normal">
        Všetku fotodokumentáciu kaziet má na starosť{" "}
        <a href="https://instagram.com/julieindrak" target="_blank" rel="noopener noreferrer">
          @julieindrak
        </a>
      </p>

      <p className="m-0 font-normal">
        Web nám spravil{" "}
        <a href="https://instagram.com/0lower0education0" target="_blank" rel="noopener noreferrer">
          @0lower0education0
        </a>
      </p>
    </div>
  );
}
