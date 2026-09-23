/**
 * Everything about the app that appears on the page, in one place.
 * Pulled from the App Store listing so the two never drift apart.
 */
export const site = {
  name: "Pushed",
  tagline: "Your GitHub streak, on your Home Screen",
  description:
    "Pushed puts your GitHub contribution graph on your Home Screen, so the streak you are building is the thing you see every time you pick up your phone.",
  appStoreUrl: "https://apps.apple.com/us/app/pushed-commit-widget/id6788594258",
  repoUrl: "https://github.com/kyreshamwell/git-widget",
  privacyUrl: "https://github.com/kyreshamwell/git-widget/blob/main/PRIVACY.md",
  developer: "Kyre Shamwell",
  price: "Free",
  requires: "iOS 17.0 or later",
  category: "Productivity",
  // PLACEHOLDER. Not a link on the page, but Open Graph and Twitter card
  // images resolve against it, so link previews stay broken until this is the
  // domain the site actually deploys to.
  siteUrl: "https://pushedapp.vercel.app",
} as const;

export type Screenshot = {
  src: string;
  alt: string;
};

export const screenshots: Screenshot[] = [
  {
    src: "/screenshots/02-six-styles.png",
    alt: "The built-in widget styles and a custom one, side by side",
  },
  {
    src: "/screenshots/03-two-layouts.png",
    alt: "The graph layout and the big streak layout compared",
  },
  {
    src: "/screenshots/04-custom-style.png",
    alt: "The custom style editor with color, shape and type controls",
  },
  {
    src: "/screenshots/05-emoji-streak-icon.png",
    alt: "Choosing an emoji to mark the streak",
  },
  {
    src: "/screenshots/06-your-contributions.png",
    alt: "The in-app contribution graph with streak and totals",
  },
  {
    src: "/screenshots/01-home-screen-widgets.png",
    alt: "Four Pushed widgets in different styles on an iPhone Home Screen",
  },
];

export type Feature = {
  title: string;
  body: string;
};

export const features: Feature[] = [
  {
    title: "The whole graph, on your Home Screen",
    body: "Your full contribution grid in small, medium or large. Pick a range of one month, three months, six months or a full year. It refreshes itself in the background, so you never have to open the app to see where you stand.",
  },
  {
    title: "Pick a look, or make your own",
    body: "Start from a built-in style like Classic, Terminal or Paper, each with its own palette, cell shape and type, or design one from scratch. Show the full graph or lead with a big streak number. Every widget keeps its own settings, so different looks can sit side by side.",
  },
  {
    title: "Reminders that pay attention",
    body: "Most reminder apps nag you on a timer. Pushed only speaks up when there is a reason: a midday heads-up if you have not pushed, an evening warning when a streak is genuinely on the line, and nothing at all on days you have already committed. Reminders stay off until you turn them on, you set the times yourself, and one switch turns them all back off.",
  },
  {
    title: "No servers, no account, no tracking",
    body: "Pushed has no backend. Your access token lives in the iOS Keychain and is read-only. The one request the app makes goes to GitHub, for your own contribution data. Nothing is collected and nothing is sent anywhere else.",
  },
];
