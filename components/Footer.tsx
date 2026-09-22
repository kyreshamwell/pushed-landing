import { site } from "@/lib/site";

const links = [
  { href: site.appStoreUrl, label: "App Store" },
  { href: site.repoUrl, label: "Source" },
  { href: site.privacyUrl, label: "Privacy" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-hairline">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-sm font-medium tracking-tight">{site.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-faint">
            Built by{" "}
            <a
              href={site.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-dim underline decoration-edge underline-offset-4 transition hover:text-ink hover:decoration-level-4"
            >
              {site.developer}
            </a>
            . Not affiliated with or endorsed by GitHub, Inc.
          </p>
        </div>

        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
