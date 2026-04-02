import Image from "next/image";
import type { Release } from "@/lib/releases";

export function ReleaseEntry({ release }: { release: Release }) {
  const line = `${release.catalog} ${release.artist} — ${release.title}`;
  return (
    <article className="release-entry">
      <Image
        src={release.coverSrc}
        alt={`Cover: ${line}`}
        width={200}
        height={200}
        className="mb-3 block h-auto max-w-[200px] object-contain"
        sizes="200px"
      />
      <p className="m-0 font-normal leading-snug">
        <strong className="smut-stretch font-bold">{line}</strong>
      </p>
    </article>
  );
}
