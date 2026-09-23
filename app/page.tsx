import { AppStoreButton } from "@/components/AppStoreButton";
import { DemoVideo } from "@/components/DemoVideo";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { HeroGrid } from "@/components/HeroGrid";
import { HeroWidget } from "@/components/HeroWidget";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Rise, SplitHeading } from "@/components/SplitHeading";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Nav />

      <main id="main">
        {/* Hero */}
        <section className="relative px-6 pt-16 sm:pt-24">
          <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-20">
            <div>
              <Rise>
                <p className="label">iOS Home Screen widget</p>
              </Rise>

              <SplitHeading
                text="Your GitHub graph, on your Home Screen"
                accentFrom={4}
                delay={0.08}
                className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.1rem]"
              />

              <Rise delay={0.45}>
                <p className="mt-7 max-w-md text-pretty leading-relaxed text-ink-dim">
                  {site.name} puts your contribution graph where you already
                  look a hundred times a day. Fill in the squares, keep the
                  streak alive, never open GitHub to check.
                </p>
              </Rise>

              <Rise delay={0.55}>
                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <AppStoreButton />
                  <dl className="space-y-1">
                    <div className="flex gap-2">
                      <dt className="label">Price</dt>
                      <dd className="font-mono text-[11px] tracking-wide text-ink-dim">
                        {site.price}
                      </dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="label">Requires</dt>
                      <dd className="font-mono text-[11px] tracking-wide text-ink-dim">
                        iOS 17.0+
                      </dd>
                    </div>
                  </dl>
                </div>
              </Rise>
            </div>

            <HeroWidget />
          </div>
        </section>

        {/* A year of squares, running the full width. */}
        <section className="relative mt-24 sm:mt-32" aria-hidden="true">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-baseline justify-between gap-4">
              <span className="label">A year of commits</span>
              <div className="h-px flex-1 bg-hairline" />
              <span className="label">365 days</span>
            </div>
          </div>
          <div className="mt-5 overflow-hidden">
            <HeroGrid className="mx-auto w-full max-w-6xl px-6" />
          </div>
        </section>

        {/* The demo video */}
        <section
          id="demo"
          aria-labelledby="demo-heading"
          className="mt-24 scroll-mt-16 px-6 sm:mt-32"
        >
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="flex items-baseline justify-between gap-4">
                <h2 id="demo-heading" className="label">
                  Demo
                </h2>
                <div className="h-px flex-1 bg-hairline" />
                <span className="label">43 seconds</span>
              </div>
            </Reveal>

            <div className="mt-14 grid items-center gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
              <Reveal>
                <DemoVideo />
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-balance font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                  Setup, the styles, and the widget on a real Home Screen.
                </p>
                <p className="mt-6 max-w-md text-pretty leading-relaxed text-ink-dim">
                  The whole thing start to finish, including connecting your
                  GitHub account and picking a look. This is the video I posted
                  to TikTok and Instagram when {"Pushed"} launched.
                </p>
                <p className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-ink-faint">
                  Plays with sound.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Screenshots, running on their own */}
        <section aria-labelledby="shots-heading" className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <div className="flex items-baseline justify-between gap-4">
                <h2 id="shots-heading" className="label">
                  Inside the app
                </h2>
                <div className="h-px flex-1 bg-hairline" />
                <span className="label">Drag to browse</span>
              </div>
              <p className="mt-6 max-w-lg text-pretty font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                Your graph, your streak, your totals for the year, and reminders
                you set yourself.
              </p>
            </Reveal>
          </div>

          <div className="mt-12">
            <Marquee />
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mt-28 scroll-mt-16 px-6 sm:mt-36">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="label">What it does</h2>
                <div className="h-px flex-1 bg-hairline" />
                <span className="label">04</span>
              </div>
            </Reveal>
            <Features />
          </div>
        </section>

        {/* Privacy */}
        <section id="privacy" className="mt-28 scroll-mt-16 px-6 sm:mt-36">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="label">Privacy</h2>
                <div className="h-px flex-1 bg-hairline" />
              </div>
            </Reveal>

            <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal>
                <p className="text-balance font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                  There is no server to trust.
                </p>
                <p className="mt-6 max-w-md text-pretty leading-relaxed text-ink-dim">
                  {site.name} has no backend, no analytics and no account. Your
                  read-only token lives in the iOS Keychain, and the app makes
                  exactly one request.
                </p>
                <a
                  href={site.privacyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label mt-8 inline-block text-level-4 transition-colors hover:text-ink"
                >
                  Read the policy →
                </a>
              </Reveal>

              {/* The app's entire network surface, written out. */}
              <Reveal delay={0.1}>
                <div className="border border-edge bg-surface-raised">
                  <div className="flex items-center gap-2 border-b border-hairline px-4 py-2.5">
                    <span className="h-2 w-2 rounded-full bg-level-3" />
                    <span className="label">Network activity</span>
                  </div>
                  <dl className="divide-y divide-hairline font-mono text-[12.5px]">
                    <div className="flex items-baseline justify-between gap-4 px-4 py-3">
                      <dt className="text-ink">api.github.com</dt>
                      <dd className="text-ink-faint">your contribution data</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 px-4 py-3">
                      <dt className="text-ink-faint">analytics</dt>
                      <dd className="text-ink-faint">none</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 px-4 py-3">
                      <dt className="text-ink-faint">developer servers</dt>
                      <dd className="text-ink-faint">none</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 px-4 py-3">
                      <dt className="text-ink-faint">account required</dt>
                      <dd className="text-ink-faint">no</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Closing call to action */}
        <section className="mt-28 border-t border-hairline px-6 py-24 sm:mt-36">
          <Reveal className="mx-auto max-w-6xl">
            <p className="max-w-2xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
              Start a streak worth keeping.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <AppStoreButton />
              <p className="max-w-xs text-sm leading-relaxed text-ink-faint">
                Setup takes about a minute: your username and a free read-only
                token.
              </p>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
