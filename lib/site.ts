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
  repoUrl: "https://github.com/kyreshamwell/pushed",
  privacyUrl: "https://github.com/kyreshamwell/pushed/blob/main/PRIVACY.md",
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
    src: "/screenshots/1.3-01-home-screen-widgets.png",
    alt: "Pushed widgets that fill their frame, in every size, on an iPhone Home Screen",
  },
  {
    src: "/screenshots/1.3-02-six-looks.png",
    alt: "The six looks: Classic, Aurora, Ember, Terminal, Paper and Marks",
  },
  {
    src: "/screenshots/1.3-05-every-day-marked.png",
    alt: "The Marks look, with a symbol for every day: a dot, a cross, F and R",
  },
  {
    src: "/screenshots/1.3-03-new-look-every-day.png",
    alt: "The Styles screen with a few looks circled to take turns each day",
  },
  {
    src: "/screenshots/1.3-04-make-it-yours.png",
    alt: "Customizing a look with shape and color controls, ready to save",
  },
  {
    src: "/screenshots/1.3-06-rest-days.png",
    alt: "Rest days and the monthly freeze keeping a streak alive",
  },
  {
    src: "/screenshots/1.3-07-at-a-glance.png",
    alt: "The Pushed home screen with today, the streak and your looks",
  },
];

export type Feature = {
  title: string;
  body: string;
};

export const features: Feature[] = [
  {
    title: "A widget that fills its frame",
    body: "Your contribution graph and your streak, sized to fit small, medium and large with no empty corners. A ring marks today, so one glance tells you whether you have pushed. It refreshes itself in the background, so you never have to open the app.",
  },
  {
    title: "Six looks, and a symbol for every day",
    body: "Classic, Aurora, Ember, Terminal, Paper and the new Marks. Marks gives each day a symbol: a dot when you pushed, × for a miss, F for a freeze and R for a rest day. You see what happened, not just how much.",
  },
  {
    title: "Make it yours, and let it rotate",
    body: "One Styles screen to preview every look, tap the ones you love and they take turns each day. Change the shape, color, glow and font of any look, then save it as your own.",
  },
  {
    title: "Your streak, and every year behind it",
    body: "Tap Current streak, Best streak or This year to see the runs and totals behind the numbers. Past years come straight from GitHub, so your whole history is one tap away.",
  },
  {
    title: "Rest without losing your streak",
    body: "Pick your rest days and use the monthly freeze when life gets in the way. Neither one breaks your streak.",
  },
  {
    title: "Reminders that pay attention",
    body: "Most reminder apps nag you on a timer. Pushed only speaks up when there is a reason: a midday heads-up if you have not pushed, an evening warning when a streak is genuinely on the line, and nothing at all on days you have already committed. Notifications stay off until you switch them on, and the same switch turns every one of them off again. You pick the reminder times yourself.",
  },
  {
    title: "No servers, no account, no tracking",
    body: "Pushed has no backend. Your access token lives in the iOS Keychain and is read-only. The app only talks to GitHub, and only for your own contribution data. Nothing is collected and nothing is sent anywhere else.",
  },
];
