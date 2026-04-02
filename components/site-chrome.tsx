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
        <Link href="/" className="mx-auto block w-full max-w-[min(92vw,560px)] leading-none">
          <Image
            src="/images/logo/smut_typo_white.png"
            alt="SMUT — South Moravian Utility Tapes"
            width={11811}
            height={3937}
            className="mx-auto block h-auto w-full max-w-full object-contain"
            priority
          />
        </Link>
        <hr className="smut-hr mt-6" />
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
