import Image from "next/image";
import { site } from "@/lib/site";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-surface/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#main" className="flex items-center gap-2.5">
          <Image
            src="/icon.png"
            alt=""
            width={26}
            height={26}
            className="rounded-[7px] ring-1 ring-edge"
          />
          <span className="font-display text-[15px] font-semibold tracking-tight">
            {site.name}
          </span>
        </a>

        <div className="flex items-center gap-7">
          <a href="#features" className="label hidden transition-colors hover:text-ink sm:block">
            Features
          </a>
          <a href="#privacy" className="label hidden transition-colors hover:text-ink sm:block">
            Privacy
          </a>
          <a
            href={site.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ink px-3.5 py-1.5 font-mono text-[12px] font-medium tracking-wide text-surface transition hover:bg-level-4"
          >
            Download
          </a>
        </div>
      </nav>
    </header>
  );
}
