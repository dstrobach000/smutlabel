import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/releases", label: "Releases" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="smut-page min-h-screen py-6">
      <header className="smut-column mx-auto text-center">
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
          <Link href="/" className="shrink-0 leading-none">
            <Image
              src="/images/logo/smut_full_white.png"
              alt="SMUT"
              width={88}
              height={88}
              className="h-[72px] w-[72px] object-contain sm:h-[88px] sm:w-[88px]"
              priority
            />
          </Link>
          <p className="smut-stretch m-0 max-w-[20rem] text-center text-base font-bold leading-tight sm:max-w-none sm:text-left sm:text-lg">
            SOUTH MORAVIAN UTILITY TAPES
          </p>
        </div>
        <hr className="smut-hr mt-5" />
        <nav
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 font-bold"
          aria-label="Main"
        >
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <hr className="smut-hr" />
      </header>

      <main className="smut-column mx-auto py-5">{children}</main>

      <footer className="smut-column mx-auto text-center">
        <hr className="smut-hr" />
        <p className="m-0 mt-4 text-base font-normal">
          <a href="mailto:info@smutlabel.monster">info@smutlabel.monster</a>
        </p>
      </footer>
    </div>
  );
}
