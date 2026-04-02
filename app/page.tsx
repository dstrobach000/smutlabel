const MENU = [
  { id: "menu-1", label: "Menu 1", title: "Welcome zone" },
  { id: "menu-2", label: "Menu 2", title: "Downloads (imaginary)" },
  { id: "menu-3", label: "Menu 3", title: "Guestbook (not really)" },
  { id: "menu-4", label: "Menu 4", title: "Links & webrings" },
  { id: "menu-5", label: "Menu 5", title: "Under construction" },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen px-3 py-4 pb-10 sm:px-6">
      <div
        className="mx-auto max-w-4xl border-4 p-1 sm:p-2"
        style={{
          borderColor: "#ff00cc",
          background: "linear-gradient(180deg, #2a1a6e 0%, #12083a 100%)",
          boxShadow:
            "4px 4px 0 #000, inset 0 0 0 2px #00ffff, inset 0 0 20px rgba(255,0,204,0.15)",
        }}
      >
        <header
          className="relative overflow-hidden border-b-4 px-3 py-4 text-center sm:px-6 sm:py-6"
          style={{
            borderColor: "#00ffff",
            background:
              "repeating-linear-gradient(135deg, #1f0d55 0px, #1f0d55 8px, #2a1566 8px, #2a1566 16px)",
          }}
        >
          <p
            className="mb-2 font-mono text-xs tracking-widest uppercase sm:text-sm"
            style={{ color: "#ccff00", textShadow: "0 0 8px #ff00cc" }}
          >
            *** you are now entering ***
          </p>
          <h1
            className="text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl"
            style={{
              fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
              color: "#ffff66",
              textShadow:
                "3px 3px 0 #ff00cc, 6px 6px 0 #00ffff, 0 0 24px rgba(255,255,255,0.4)",
              letterSpacing: "-0.02em",
            }}
          >
            SMUT
          </h1>
          <p className="mt-2 text-sm italic" style={{ color: "#aaf" }}>
            smutlabel.monster — est. 199_?
          </p>
          <div
            className="mt-3 overflow-hidden border-2 py-1 font-mono text-xs sm:text-sm"
            style={{
              borderColor: "#ff00cc",
              background: "#0a0528",
              color: "#00ffff",
            }}
          >
            <div className="smut-marquee-inner">
              <span className="pr-16">
                ★ WELCOME ★ BEST VIEWED AT 800×600 ★ UNDER CONSTRUCTION ★
                HOT JAVA APPLET LOADING… ★ SIGN MY GUESTBOOK ★
              </span>
              <span className="pr-16">
                ★ WELCOME ★ BEST VIEWED AT 800×600 ★ UNDER CONSTRUCTION ★
                HOT JAVA APPLET LOADING… ★ SIGN MY GUESTBOOK ★
              </span>
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-4 p-3 sm:flex-row sm:p-4">
          <nav
            className="shrink-0 border-4 p-3 sm:w-44"
            style={{
              borderStyle: "outset",
              borderColor: "#00cccc",
              background: "#180a44",
            }}
            aria-label="Main"
          >
            <p
              className="mb-2 border-b-2 pb-1 text-center font-mono text-xs font-bold uppercase"
              style={{ borderColor: "#ff00cc", color: "#ccff00" }}
            >
              ~ navigate ~
            </p>
            <ul className="m-0 list-none space-y-2 p-0 font-mono text-sm">
              {MENU.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="block underline decoration-wavy"
                    style={{ textDecorationColor: "#ff00cc" }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <hr className="my-3 border-0 border-t-2" style={{ borderColor: "#ff00cc" }} />
            <p className="text-center font-mono text-[10px] leading-tight" style={{ color: "#889" }}>
              visitors:
              <br />
              <span className="smut-blink text-base" style={{ color: "#ffff66" }}>
                000847
              </span>
            </p>
          </nav>

          <main
            className="min-w-0 flex-1 border-4 p-4 sm:p-5"
            style={{
              borderStyle: "inset",
              borderColor: "#663399",
              background: "#0f0633",
            }}
          >
            <p className="mb-4 font-mono text-xs" style={{ color: "#7fdbca" }}>
              &gt;&gt; main_content.txt [ASCII MODE]
            </p>
            {MENU.map((item, i) => (
              <section
                key={item.id}
                id={item.id}
                className="mb-8 scroll-mt-4 last:mb-0"
              >
                <h2
                  className="mb-2 inline-block border-b-2 pb-1 text-xl font-bold sm:text-2xl"
                  style={{
                    borderColor: "#00ffff",
                    color: "#ff99ff",
                    textShadow: "1px 1px 0 #000",
                  }}
                >
                  {item.title}
                </h2>
                <p className="mb-2 text-[15px]" style={{ color: "#ddd8ff" }}>
                  This is the content area for <strong>{item.label}</strong>. In
                  the golden age of the web, every page had a paragraph like this
                  — starry backgrounds, chunky borders, and a promise that more
                  stuff was coming soon.
                </p>
                <p className="text-[15px]" style={{ color: "#bbb6ee" }}>
                  Section index: {i + 1} of {MENU.length}. If this were truly
                  1997, there would be a spinning @ email GIF and a “Netscape
                  Now!” button right about here.
                </p>
              </section>
            ))}
          </main>
        </div>

        <footer
          className="border-t-4 px-4 py-4 text-center"
          style={{
            borderColor: "#ff00cc",
            background: "linear-gradient(180deg, #1a0b4d 0%, #0d0428 100%)",
          }}
        >
          <p className="m-0 font-mono text-sm" style={{ color: "#aaf" }}>
            © smutlabel — questions? rave? lawsuits?
          </p>
          <p className="mt-2 m-0">
            <a
              href="mailto:info@smutlabel.monster"
              className="font-mono text-base font-bold"
            >
              info@smutlabel.monster
            </a>
          </p>
          <p className="mt-3 font-mono text-[10px]" style={{ color: "#666" }}>
            made with Next.js + Tailwind (shh, don&apos;t tell Geocities)
          </p>
        </footer>
      </div>
    </div>
  );
}
