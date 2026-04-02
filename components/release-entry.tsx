import Image from "next/image";
import type { Release } from "@/lib/releases";

export function ReleaseEntry({ release }: { release: Release }) {
  const line = `${release.catalog} ${release.artist} — ${release.title}`;
  return (
    <article className="release-entry flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
      <Image
        src={release.coverSrc}
        alt={`Cover: ${line}`}
        width={200}
        height={200}
        className="h-auto w-[200px] max-w-full shrink-0 object-contain"
        sizes="(max-width: 640px) 100vw, 200px"
      />
      <div className="min-w-0 flex-1 text-left">
        <p className="m-0 mb-3 font-normal leading-snug">
          <strong className="smut-stretch-left font-bold">{line}</strong>
        </p>
        <p className="m-0 font-normal leading-snug">{release.description}</p>
      </div>
    </article>
  );
}
