# CLAUDE.md — Living Internet Alliance Landing Page

Project context for any Claude session working in this repository. Read this first.

> **Picking this up in a fresh chat?** Jump to **§13 Current status & next steps** for exactly
> where things stand and what's left. Two things from the previous session do NOT carry over and
> may need re-providing: the **attendee spreadsheet** (`Summit_Registrants_2026-2.xlsx`, was an
> upload) and the companion planning doc `creator-sprint-landing-plan.md` (lived in the session
> scratchpad, not in this repo).

> **⚠️ Registration is now CLOSED (as of 2026-06-30).** `index.html` was rewritten as a
> post-registration page: thank-you hero, testimonial wall, a membership CTA, and the 2027
> waitlist. As of **2026-08-05** it funnels to **paid** premium membership via `/membership`,
> not the free tier. The old sales page (pillars, journey, who-it's-for, FAQ, $177 register
> panel, countdown) is archived at `index-sprint-open-archive.html` for reference, not linked
> from anywhere live. Most of §8, §9, and §10 below describe that archived version; see the
> note at the top of §8 for what's actually live now.

---

## 1. What this is

This repo holds the **landing page for The Living Internet Alliance**, currently a post-registration page for the **90-Day Creator Sprint**. The page is the homepage of **`www.thelivinginternet.com`** and originally replaced the now-finished Future-Proof Creator Summit 2026 landing page (which was a Framer site).

Registration for the Sprint closed at **2:00 PM PDT on June 30, 2026**; the Sprint itself runs **July 1 – September 30, 2026** with no late entries. The live page no longer sells the Sprint. Its job now is to thank 2026 summit attendees, keep the testimonial wall up, funnel people into **paid premium membership** (via `/membership`, since 2026-08-05; it pointed at the free tier before that), and build the **2027 summit waitlist**.

### The product being sold
The **90-Day Creator Sprint** is a guided integration program for digital creators. For people who did not attend the 2026 summit, it costs **$177 USD** and includes **3 months of Premium Living Internet University membership** plus full Sprint access. Summit attendees already hold a year of membership and get the Sprint at no extra cost.

The Sprint consists of six pillars:

1. **Three one-month writing challenges** — optional; 15 minutes/day of undistracted writing, done at any time of day, with a shared streak checklist so everyone sees each other's streaks.
2. **Eight speaker workshops** — live webinars across the 90 days with speakers from the 2026 summit (kept generic, not named, for now). Usually Thursday evenings and Saturday mornings PDT. All recorded.
3. **Monthly networking calls** — community-wide, open to all Premium members, 2+ hours each, once a month, to share grievances, goals, and celebrations.
4. **Mental well-being resources** — a growing pool of support for the isolation of digital entrepreneurship.
5. **Facilitated accountability pods** — self-governing groups of 4 to 6 people who meet weekly on a loose structure. Pods mix 2026 summit attendees (about 100 people were at the in-person event) with new registrants. Sorted by time zone, creative focus area, and grouping requests via an intake survey (the survey arrives in the welcome email flow, not on this page).
6. **The online community** — a home base in Circle with spaces to chat, share work in progress, and trade feedback. Also hosts the full recordings of the 2026 Future-Proof Creator Summit (a real draw for non-attendees). The **free** spaces (e.g. the Maker Space chat) stay open even after Premium lapses.

### The 90-day spine (used in the "journey" section)
- **Month 1 — Foundations / "Show up."** Writing Challenge #1, pods form, first networking call, 3 workshops. Build the daily practice.
- **Month 2 — Momentum / "Go deeper."** Writing Challenge #2, networking call #2, 3 workshops. The messy middle where most people quit and the pod carries you.
- **Month 3 — Integration / "Make it yours."** Writing Challenge #3, celebration call, final 2 workshops. The practice becomes who you are.

(Workshop distribution 3/3/2 = 8 total. The page states exact counts; keep the real schedule matching.)

---

## 2. Audience & strategy

**Primary audience: non-attendees** (cold-ish creators paying $177). The page is built as a sales page optimized for new sign-ups. Summit attendees are handled as a warm, clearly-flagged secondary path, never a paywall.

**Core emotional task:** let a stranger *borrow the afterglow* of a room they were not in. The 2026 attendees had a transformative, peak experience and posted unsolicited testimonials. The page uses those testimonials and summit photos to make a cold visitor feel the energy of the event, then positions the Sprint as the on-ramp to that same energy. The 2027 summit waitlist is the door back into the room.

**Tone: warm and values-first.** Belonging, transformation, integration. The deadline and "no late entries" scarcity are real and stated plainly, but they live lower on the page rather than being shouted. The brand is anti-hype and human-first (its whole premise is creative work AI cannot replace), so the copy itself must never read as funnel-generated.

---

## 3. Brand & identity

- **Parent org:** The Living Internet Alliance.
- **Membership tier:** Premium Living Internet University.
- **Brand through-line:** "Build a creative business AI can't replace."
- **Origin event:** Future-Proof Creator Summit 2026, Abbotsford BC, June 5–7, 2026.
- **Contact for access issues:** jesse@thelivinginternet.com

---

## 4. Design system

**Theme:** dark mode, black and white, warm-editorial. Mostly pure black backgrounds with warm-white text.

**Type:**
- Display / headings: **Fraunces** (warm italic serif) — carries the values-first feeling.
- Body / UI: **Inter**.
- Wordmark ("The Living Internet Alliance"): **Montserrat, Bold (700), always.** Hard rule. Has its own `--wordmark` CSS variable.

**Color tokens** (see `:root` in `styles.css`):
- `--ink` `#0a0a0a` page base, `--ink-2` `#121212` raised surfaces, `--black` `#000`.
- `--text` `#f2f0ec` warm white, `--text-dim` muted, `--text-faint` faintest.
- `--paper` `#f4f1ec` warm off-white for large display text.
- `--accent` `#e8c89a` — warm gold accent. CTAs stay pure white-on-black to honor the black-and-white direction; the accent is reserved for hairline borders/glow only, used (via `--accent-soft` / `--accent-glow` / `--accent-faint` derived tokens) on the pillars grid, register panel, who-it's-for columns, photo strip, and the 2027 whisper section's smoke background. Only extend its use further if the user explicitly asks.

**Motion:** subtle and tasteful only. Slow hero zoom drift, scroll cue pulse, modal/fade entrances. All disabled under `prefers-reduced-motion`.

**Social proof rendering:** testimonial screenshots appear as *real social posts in their native chrome* (X / Instagram frames), not reformatted into clean pull-quotes. The unsolicited authenticity is the asset. Rendered as a masonry wall.

**Design signature:** the page feels like a *journey* (90 days, three arcs), not an event (one weekend). Forward motion via the Month 1 → 2 → 3 timeline. This visually distinguishes a $177 program from a list of perks.

---

## 5. Writing conventions (hard rules)

- **Never use em dashes (—) in copy.** Use colons, commas, periods, or middots (·) instead. Applies to all visible page copy. (En dashes in number/date ranges like "July 1 – Sept 30" are acceptable.) The page is currently 100% em-dash-free; keep it that way.
- Write to one person, second person ("you"), present tense.
- Name the loneliness of creating directly; the well-being pillar earns it.
- Avoid hype language: "transform your life," "unlock," "10x," stacked countdown timers.
- Earn every urgency claim with a real reason. The only honest scarcity is structural: pods form together on July 1, so you genuinely cannot join late. Lean on that, not fake "spots left."
- **Be truthful.** This is the first time the Sprint has run, so no "most people find…" social proof about the Sprint itself. The summit testimonials are real and fair game.

---

## 6. File structure

```
/
├── index.html                       Live page: post-registration (thank-you, proof, free
│                                    community CTA, 2027 waitlist). Inline JS: in-page nav
│                                    smooth-scroll only.
├── index-sprint-open-archive.html   Archived pre-close version (full sales page: pillars,
│                                    journey, who-it's-for, FAQ, $177 register + countdown,
│                                    attendee modal). Not linked from any live page.
├── styles.css              All styles (dark theme, design tokens in :root). Shared by both
│                          index.html and the archive; classes for the archived-only sections
│                          (pillars, journey, who, register, FAQ, attendee modal) stay in the
│                          stylesheet even though index.html no longer uses them.
├── CNAME                   Custom domain for GitHub Pages: www.thelivinginternet.com
├── CLAUDE.md               This file
├── LAUNCH.md               Step-by-step go-live checklist (deploy, paywall, waitlist, DNS)
├── accountability.md       Source content outline for /group-guide (not itself published)
├── group-guide/            Standalone page-turning guide for Sprint accountability-group
│   ├── index.html          members, at www.thelivinginternet.com/group-guide. Not linked
│   ├── styles.css          from index.html or any nav. Own light "e-ink" theme (paper bg,
│   └── script.js           warm ink text) distinct from the rest of the dark site; still
│                          uses the shared Fraunces/Inter/Montserrat fonts. One page visible
│                          at a time with a book-style page-turn transition (arrows, edge tap
│                          zones, swipe, arrow keys), dot + "Page X of N" indicator at bottom.
│                          Header reuses the black nav bar look but brand-only, no nav links.
├── membership/             Sales page for the always-open **premium community membership**
│   ├── index.html          ($27/mo or $260/yr), at www.thelivinginternet.com/membership.
│   └── membership.css      Added 2026-08-05. A separate product from the annual summit;
│                          keeps event promotion out of it entirely. Loads the shared
│                          ../styles.css for tokens/nav/hero/pillars/footer, plus its own
│                          membership.css for page-only components (.room manifesto list,
│                          .proof-trio, .plans pricing cards, .takeaway). Inline JS is the
│                          same nav smooth-scroll block as index.html. Sections: hero
│                          (img13-web.jpg) → who's in the room → what's included (2x2
│                          pillars) → 3 testimonials → pricing (annual featured) → quiet
│                          Field Notes free-tier takeaway. Not yet linked from index.html.
├── living-room/            "The Living Room" event page, hosted by Jesse James Carver &
│   ├── index.html          Matthew Manning, at www.thelivinginternet.com/living-room. Not
│   ├── main.css             linked from index.html or any nav — hidden page, noindex/
│   ├── living-room.css      nofollow. Relocated from the jjcarver site; self-contained
│   └── images/              with its own copy of jjcarver's main.css. Header/footer
│       ├── soiul-hero.jpg   rebranded to The Living Internet Alliance (brand-only header,
│       └── sauna.jpg        no nav links, matching group-guide/'s pattern). living-room.css
│                            (page-specific overrides) still has "isi-" prefixed classes,
│                            legacy from the page's former "Iron Sharpens Iron" name.
├── .github/workflows/
│   └── deploy.yml          GitHub Pages auto-deploy on push to main
└── assets/images/
    ├── graphics/
    │   └── logo-white.png         White square logo (470x470, transparent)
    ├── summit-photos/
    │   ├── img1.jpg               Hero bg. Jesse at the mic before the speaker panel.
    │   │                          (Edited/compressed "extended curtains" version.)
    │   ├── img1-a.jpg             Original/backup of the hero shot.
    │   ├── img5.jpg img6.jpg img14.jpg   Used in the proof-section photo strip
    │   │                          (audience / workshop-in-action / connection moment).
    │   ├── img13-web.jpg          Web-optimized derivatives (sips-resized + recompressed
    │   ├── img2-web.jpg           to ~230-420 KB) built for /membership. The originals
    │   ├── img11-web.jpg          they came from are 1-2 MB, too heavy to ship. img13-web
    │   ├── img15-web.jpg          is the membership hero; the other three are its photo
    │   │                          strip. Regenerate with:
    │   │                          sips -Z <px> -s format jpeg -s formatOptions <q> in --out out
    │   └── img2,3,4,7,9..15.jpg   Other summit photography (img8 removed). Mostly raw
    │                              1-2 MB originals: optimize before putting any on a page.
    └── testimonials/
        └── test1..test18.png      Voluntary social-post screenshots.
                                    NOTE: test9.png is absent → 17 images, not 18.
```

**Tech:** plain static HTML + CSS, no build step, no framework. `index.html` keeps one small vanilla-JS block for in-page nav smooth-scrolling; the archived sales page additionally has the attendee modal and registration countdown scripts. Fonts load from Google Fonts (Fraunces, Inter, Montserrat). Keep it dependency-free unless there's a strong reason not to.

---

## 7. Deployment & hosting (READ before touching deploy)

- **Repo:** `git@github.com:GitRealHappy/creator.git` (this folder is the local clone).
- **Host:** GitHub Pages, deployed by `.github/workflows/deploy.yml` (GitHub Actions) on every push to `main`. No Jekyll build; it uploads the directory as-is.
- **Custom domain:** `www.thelivinginternet.com`, set via the `CNAME` file in repo root. Because this project repo carries that CNAME, Pages serves the site at the **domain root** (`https://www.thelivinginternet.com/`), so relative paths (`styles.css`, `assets/...`) resolve correctly.
- **DNS:** a `www` CNAME record → `gitrealhappy.github.io`.
- **To go live:** `git add -A && git commit -m "…" && git push`. Wait ~1 min for the Action.
- **⚠️ Lessons learned (don't repeat):**
  - **Never force-push over history without the `CNAME` file.** A force push wiped it once and the custom domain went down. The CNAME is now a tracked file; keep it.
  - The **GitHub Pages project URL serves under a `/creator/` subpath** (`…github.io/creator/`). At a subpath, relative asset paths only resolve if the URL has a **trailing slash**; without it you get unstyled HTML. This is a non-issue at the custom-domain root, which is the real target.

---

## 8. Page structure

### What's live now in `index.html` (post-registration page)
- ✅ **Nav** — white logo + Montserrat-bold wordmark, solid white **"Become a member"** button (→ `/membership`), anchor links to `#proof` / `#community` / `#summit-2027`. Same solid black bar treatment as before. (Was a ghost "Join free" button + a `#recordings` link until 2026-08-05.)
- ✅ **Hero** — `img1.jpg` background with a legibility scrim, eyebrow, Fraunces thank-you headline ("Thank you for showing up... the room is still warm."), warm paragraph thanking attendees, CTA "Become a member" → `#community`, and smaller microcopy: "Premium membership is open year round, and the 90-Day Creator Sprint comes with it." (Until 2026-08-05 this said registration was closed and pointed at the free tier; that was true of the *Sprint sign-up window*, never of Premium, and it contradicted the new funnel.)
- ✅ **Photo strip + testimonial wall** (`#proof`) — unchanged from the original: img6/img5/img14 strip, then the masonry wall of 17 screenshots (`test9.png` still absent). Lead-in copy unchanged: "Nobody asked them to post these."
- ❌ **2026 summit recordings offer** (`#recordings`) — **REMOVED 2026-08-05.** Sold standalone access to the summit recordings for $147 one time, and named all 13 2026 speakers (Dan Koe, Dan Goldfield, Taylin Simmonds, Kieran Drew, Kimia Nora, Jack Moses, David Morin, Ish Hasan, Logan Quinn, Olivia Peers, Michael Oliver, Jesse James Carver, Brian Maierhofer). Cut because premium membership already unlocks those recordings, so the $147 product competed with the $27/mo funnel. The speaker-lineup copy is now **unused anywhere on the site** and is preserved only here and in git history: it is the one sanctioned exception to the "speakers kept generic" rule, so reuse it deliberately if a page ever needs it. The Circle paywall itself still exists (§11).
- ✅ **Become a member** (`#community`) — **rewritten 2026-08-05** from a free-tier CTA into the paid funnel. New `.member-band` component in `styles.css`: `--ink-2` base, animated warm-accent radial smoke (like `.whisper`), accent hairline borders, gold `.eyebrow`, a Fraunces headline in **gold gradient text** (`background-clip: text`, falls back to flat `--accent`), and a solid gold `.btn--gold` CTA → `/membership`. This is the **only place the accent is used as text and as a button fill**; it is a deliberate, Jesse-approved extension of the "accent is for hairlines and glow" rule, because this band is the conversion path on an otherwise black-and-white page. Copy leads with the $497 in-person value of the summit recordings. Says nothing about the free tier: free is reachable from `/membership`'s Field Notes takeaway.
- ✅ **2027 Summit whisper** (`#summit-2027`) — slim raised band, copy updated to say the location isn't announced and dates aren't confirmed, but the summit is likely southwest USA; ghost "Join the 2027 waitlist" button → Ticket Tailor.
- ✅ **Footer** — wordmark, jesse@ contact, © line. (Privacy/Terms links were removed along with the rest of the sales-page footer; re-add if those pages are needed again.)

No countdown, no attendee modal, no pillars/journey/who-it's-for/FAQ/register panel/final CTA on the live page. Those all still exist, unchanged, in `index-sprint-open-archive.html` if the Sprint reopens or a similar page is needed for the next cohort — see that file for the full original section list (nav Register CTA, attendee modal + strip, six pillars, 90-day journey timeline, who-it's-for columns, $177 register panel with live countdown, FAQ accordion, final CTA).

### CTA wiring (live, in `index.html`)
- **Nav "Become a member"** → `/membership`. **Hero CTA "Become a member"** → `#community` (the gold band), which then goes to `/membership`. The Circle free-tier invitation-token join link is **no longer used on `index.html`**; it survives in git history and in the archive page.
- **Join the 2027 waitlist** → `https://tickets.thelivinginternet.com/events/thelivinginternetalliance/2274135` (Ticket Tailor; **still needs publishing**, see §12).
- No `href="#"` placeholders remain.
- The archived page's CTA wiring (Register → `#get-access`, checkout → Circle paywall) is documented at the top of that file's history; unchanged there.

---

## 9. Deadline & countdown mechanics (archived page only)

- **Registration closed:** 2:00 PM PDT, June 30, 2026. This has now passed; the live `index.html` reflects the closed state directly in hero copy rather than a countdown.
- **Sprint ran/runs:** July 1 – September 30, 2026. No late entries (pods form together).
- **Countdown:** still present in `index-sprint-open-archive.html`'s `#register` panel, counting down to the fixed instant **`2026-06-30T21:00:00Z`** (14:00 PDT / UTC-7). Vanilla JS in that file; on expiry swaps to "Registration has closed. The Sprint has begun." Not used on the live page.

---

## 10. FAQ answers (locked, live on page)

- **Attended the summit?** No, open to any creator.
- **Miss a workshop live?** Everything is recorded.
- **When are live sessions?** Workshops usually Thursday evenings + Saturday mornings PDT; community-wide networking calls (open to all Premium members) once a month, 2+ hours. All Pacific.
- **Writing challenge mandatory?** No, optional. 15 min/day, any time, shared streak checklist.
- **After 90 days (end of Sept)?** Premium lapses; option to renew at new pricing with lighter offerings. Free spaces (Maker Space chat) stay open; only premium spaces close.
- **Refunds?** No refunds. All sales are final. The summit recordings alone are worth the price of entry; this is a community of people who invest in themselves without a safety net.
- **Pod grouping?** Time zone, creative focus area, grouping requests, via an intake survey posted in the community (accessible immediately upon registering, not sent by email).

---

## 11. Circle setup (community platform)

Community: **The Living Internet Alliance** (Circle community `id 392287`, private, 273 members). Decisions: payment via **Circle Paywall** (one-time $177, then auto-downgrade); attendees get free access by matching the spreadsheet.

**Access groups (relevant IDs):**
- `46857` **Premium Membership** — the paid tier (118 members). Unlocks premium spaces incl. 2026 Summit recordings.
- `46856` **Free Community** — free + expired-premium members. Where the cohort lands after the Sept 30 lapse.
- `131604` **90-day-sprinters** — Sprint participants (currently **0 members**). Gates the Sprint spaces.
- Others: `47209` Speakers, `50960` VIP Convention Attendees, `101053` Wayfinders, `76431` Web Rebels.

**Space groups:** `1097296` 90-Day Creator Sprint 2026 (**249 members, 1 space — see cleanup below**), `933208` Maker Space (free chat), `860412` Courses/Quests, `848195` The Map, `842601` The 2026 Summit (7 spaces, holds recordings).

**The paywall (live):** `https://living-internet-alliance.circle.so/checkout/90-day-creator-sprint`. It should grant **Premium Membership + 90-day-sprinters** on purchase. ⚠️ The Circle checkout page's own copy needs a fix: it reads "this **-Day** Sprint" / "the **day** writing challenges" (the number 90 dropped out of a field), and says "not all perks will apply" while naming Laura Hanna + speakers — reconcile with the landing page (which sells the full Sprint and keeps speakers generic). Paywall creation/editing is done in Circle's UI; not exposed via the MCP tools.

**The $147 recordings paywall (orphaned as of 2026-08-05):** `https://living-internet-alliance.circle.so/checkout/2026-fpcs-recordings`. **No longer linked from any live page** — the `#recordings` section was removed because premium membership already includes the summit recordings and the one-time product undercut the subscription. The paywall still exists in Circle and is still reachable by direct URL. ⚠️ Decide whether to disable it, redirect it to the membership checkout, or leave it as a side door for people who only want the recordings.

**The membership paywall (live, verified 2026-08-05):** `https://living-internet-alliance.circle.so/checkout/membership`. Offers **both** $27/month and $260/year and grants **Premium Membership** (`46857`). This is the product sold by `/membership` and by `index.html`'s gold `#community` band.

**The 249-member mystery (needs cleanup):** the Sprint *space group* has 249 members but the *access group* `90-day-sprinters` has 0, and Premium has 118. So 249 people are stray space-group members (likely a bulk-add), not properly gated. Reconcile before opening paid spaces so the Sprint content is correctly gated by the access group.

**Attendee free-access sync (to do):** match the attendee spreadsheet (`Summit_Registrants_2026-2.xlsx`, 177 rows: FIRST NAME / LAST NAME / EMAIL; some email cells blank) against Circle members by email (name fallback) and add matches to `90-day-sprinters` (+ confirm Premium). Then attendees just log in. Claude can do this via the Circle MCP tools once the spreadsheet is re-provided.

**Sept 30 lapse (to do):** a scheduled task that moves the cohort Premium → Free Community at end of September (one-time charge behaves like a clean 3-month term, no surprise renewals).

**Sprint spaces to build** (in the Sprint space group): home/announcements, writing-challenge space (with the shared streak checklist), workshop hub (events + recordings), networking-call events, pod-coordination space, well-being resources.

---

## 12. Commerce (Ticket Tailor) & the 2027 waitlist

Commerce historically runs on **Ticket Tailor** (`tickets.thelivinginternet.com`, Stripe-connected, store `st_73705`). The 2026 summit is event series `es_2057263` (in-person sold out; virtual was on sale).

**2027 waitlist (created, not yet public):** event series **`es_2274135`** "Future-Proof Creator Summit 2027," waitlist enabled, pre-sale shown sold out, dates/venue TBA (placeholder occurrence Jun 4–6 2027, easily changed). Public URL `https://tickets.thelivinginternet.com/events/thelivinginternetalliance/2274135`, already wired to the page button.
- **⚠️ Still DRAFT.** Ticket Tailor won't publish an event until a Stripe payment method is attached to it, and that attach-and-publish step is **dashboard-only** (not in the API). Until Jesse does it (TT → open the 2027 event → attach Stripe → Publish), the waitlist link 404s.

---

## 13. Current status & next steps

**Done:** original full sales page built and launched, then **retired on 2026-06-30** when Sprint registration closed. Live `index.html` rewritten as the post-registration page (§8); old page preserved at `index-sprint-open-archive.html`. `CNAME` added, `LAUNCH.md` written, domain live. **2026-08-05:** built `/membership`, the standalone sales page for the always-open premium community membership ($27/mo, $260/yr → `circle.so/checkout/membership`), with the free Field Notes space as its secondary takeaway (§6).

**Membership page open items:**
- ✅ Paywall verified: `/checkout/membership` offers both $27/mo and $260/yr and grants Premium (`46857`).
- ✅ Linked from `index.html` (nav CTA, hero CTA, and the gold `#community` band).
- ✅ Sprint copy corrected. The page no longer implies a fresh cohort. Pillar 03 plus a `.note` block under the pillars now say plainly: the Sprint runs July–September and is already underway; workshops are recorded so you can work backward; pods formed July 1 so **you are not placed in one automatically** and the accountability channel is where groups post openings; most sprinters came from the in-person summit, which makes it the shortest path to knowing the 2027 room.
- ⚠️ **Re-date this page after September 30, 2026.** The `.note` block and pillar 03 are written for a Sprint that is *currently running*. Once it ends, that copy is wrong.
- The 3 testimonials are 2026 *summit* posts, not membership testimonials. The section copy says so plainly. Swap in member testimonials once there are some.
- Still unverified: the "bi-weekly live calls" cadence in pillar 01.

**Pending (rough priority):**
1. **Publish the 2027 waitlist** in Ticket Tailor (attach Stripe → Publish) — only Jesse can; §12. Still the top open item; the live page's waitlist button 404s until this happens.
1a. **Decide the fate of the orphaned $147 recordings paywall** (`/checkout/2026-fpcs-recordings`). Its landing-page section was removed 2026-08-05, but the checkout is still live at its direct URL: disable it, redirect it to the membership checkout, or keep it as a deliberate side door. §11.
2. **Fix the Circle checkout page copy** (the missing "90," "not all perks," speaker naming) — §11. Lower urgency now that the checkout isn't linked from the live page, but worth fixing before any future reopen.
3. **Attendee access sync** from the spreadsheet → `90-day-sprinters` (re-provide the xlsx) — §11.
4. **Clean up the 249** stray space-group members so Sprint spaces are access-gated — §11.
5. **Schedule the Sept 30 lapse** (Premium → Free) — §11.
6. **Build out the Sprint spaces** in Circle — §11.

**Open decisions:** whether/when to reopen registration for a future cohort (would mean reviving `index-sprint-open-archive.html` rather than rebuilding); renewal pricing/offerings after September for anyone already enrolled; whether 2026 speakers can be named (currently generic); 2027 summit actual location/dates once confirmed (page currently says "likely southwest USA," TBA).

---

## 14. Working agreements for Claude

- Collaborative, iterative build. Check in before large moves.
- Match the established design tokens and conventions; do not introduce new colors, fonts, or libraries without asking.
- Keep all copy em-dash-free and on the warm, values-first, anti-hype voice.
- Consequential external actions (creating/charging via Circle or Ticket Tailor, bulk member changes, pushing/deploying) — confirm with Jesse first.
