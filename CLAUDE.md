# CLAUDE.md — Living Internet Alliance Landing Page

Project context for any Claude session working in this repository. Read this first.

> **Picking this up in a fresh chat?** Jump to **§13 Current status & next steps** for exactly
> where things stand and what's left. Two things from a much earlier session do NOT carry over
> and may need re-providing if the Sprint/attendee-sync work resumes: the **attendee spreadsheet**
> (`Summit_Registrants_2026-2.xlsx`, was an upload) and the companion planning doc
> `creator-sprint-landing-plan.md` (lived in the session scratchpad, not in this repo).

> **⚠️ As of 2026-10-01, `index.html` is a ticket-sale page for the 2027 summit, not a
> post-registration/membership page.** The 90-Day Creator Sprint has ended; the Future-Proof
> Creator Summit 2027 (Abbotsford, BC, June 4–6, 2027) is live on Ticket Tailor with real tickets
> on sale (GA $497, VIP $1,497 / 30 seats, Virtual $197, plus a $77 After-Party add-on), not just
> a waitlist. The page was rewritten to sell that ticket directly: hero + "what you're walking
> into" + the 2026 story/speakers/gallery/testimonials as proof + a `#tickets` section with the
> ticket breakdown and an embedded Ticket Tailor checkout widget + a short founder's note. **Paid
> membership has been dropped from this page entirely** (per Jesse: the Alliance is moving toward
> a free community model, to be figured out later); `/membership` still exists as its own page but
> is no longer linked from `index.html`. Most of §2, §8, §9, §10, and §11 below describe the
> 90-Day Sprint / membership-funnel era and are historical, not current; see the note at the top
> of §8 for what's actually live now. The old pre-close sales page (pillars, journey,
> who-it's-for, FAQ, $177 register panel, countdown) is still archived at
> `index-sprint-open-archive.html`, not linked from anywhere live.

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
├── last-call/              Redirect-only page (added 2026-09-14): /last-call sends visitors
│   └── index.html          to Ticket Tailor event 2398103 via JS location.replace + meta
│                          refresh (GitHub Pages has no server-side redirects). noindex.
│                          Query strings/hashes (e.g. UTM params) are passed through.
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
    ├── summit-photos/            **Cleaned up 2026-09-02**: every raw original whose only
    │   │                          job was to be the source of a `-web.jpg` derivative (or
    │   │                          that wasn't referenced by any page at all) was deleted
    │   │                          once the derivative existed, taking the folder from
    │   │                          ~380 MB to ~11 MB. Only actually-used files remain:
    │   ├── img1.jpg               Hero bg. Jesse at the mic before the speaker panel.
    │   │                          (Edited/compressed "extended curtains" version; the
    │   │                          uncompressed backup and .png variant were removed
    │   │                          in the cleanup, unused by any page.)
    │   ├── img5.jpg img6.jpg img14.jpg   Used directly (raw, not -web) in the #gallery
    │   │                          conveyor: img5/img6 at full original size, img14 too.
    │   ├── img2-web.jpg .. img15-web.jpg   Web-optimized derivatives (sips-resized +
    │   │                          recompressed to ~230-420 KB) built for /membership
    │   │                          (img13-web is its hero, img2/11/15-web its photo strip)
    │   │                          and for the index.html #gallery conveyor (img3/4/7/9/
    │   │                          10/12-web). Their raw sources are gone; regenerate from
    │   │                          a fresh export if a different crop/size is ever needed:
    │   │                          sips -Z <px> -s format jpeg -s formatOptions <q> in --out out
    │   ├── img16-web.jpg .. img44-web.jpg   29 more gallery photos, added 2026-09-02 from
    │   │                          Jesse's `futureproof-creator-summit-2026_<flickr-id>_o.jpg`
    │   │                          exports (6192x4128 originals). Same sips pipeline as
    │   │                          above; raw sources likewise deleted once optimized.
    │   └── group-photo-web.jpg    Full-room group photo, derived from a .png source
    │                              (deleted in the cleanup; the only summit photo whose
    │                              source wasn't a .jpg).
    ├── testimonials/
    │   └── test1..test18.png      Voluntary social-post screenshots.
    │                              NOTE: test9.png is absent → 17 images, not 18.
    ├── speakers/                  Speaker avatar photos for index.html #story, added
    │   └── <name>-web.jpg         2026-09-02, extended same day with 4 more. Square-cropped
    │                              (sips -c, centered) + resized to 240x240 JPEGs from
    │                              Jesse's originals (loose PNGs dropped into assets/images/
    │                              root, identified by filename: dan.png/dang.png
    │                              disambiguated as Dan Koe/Dan Goldfield via a visible
    │                              name tag in dang's source photo; nathalie.png likewise
    │                              confirmed as Nathalie Agnes via her visible name tag).
    │                              All 17 speakers covered, including Brian Maierhofer:
    │                              his source (brian.png) is a 3-person group shot, but
    │                              Jesse confirmed he's the middle person, so his crop is
    │                              centered tighter on that face specifically (600x600
    │                              before the 240 resize, vs. the roughly-1100-1800px
    │                              centered squares used for the other 16's already-solo
    │                              source photos).
    └── (loose, unorganized) hussain.png, jesseandtaylin.png, prisca.png, prisca2.png,
        prisca3.png, brian.png, and the originals of the 16 other speaker photos
        (dan.png, dang.png, david.png, ish.png, jack.png, jesse.png, kieran.png,
        kimia.png, logan.png, michael.png, olivia.png, taylin.png, nathalie.png,
        zach.png, fia.png, paul.png) — dropped directly in assets/images/ root, not
        yet organized into a subfolder. The 17 speaker originals are now superseded
        by speakers/*-web.jpg; hussain/jesseandtaylin/prisca(2/3) remain unmatched
        to any of the 17 speakers and unused anywhere (§13).
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

### What's live now in `index.html` (2027 ticket-sale page, as of 2026-10-01)
History note: everything below this point in §8 that isn't dated 2026-10-01 describes the
**90-Day Sprint / post-registration / membership-funnel eras** of this page, now superseded.
Kept for archaeology (`git log` has the rest); don't trust old bullets' CTA wiring or copy.

- ✅ **Nav** — same white logo + Montserrat-bold wordmark + solid black bar. Links: **The
  Summit** (`#about`), **Stories** (`#proof`). The nav previously also had a **Tickets**
  (`#tickets`) anchor link; removed 2026-10-01 (same day, later) per Jesse as redundant with the
  **"Get your ticket"** CTA button right next to it. The "Membership" nav link and `/membership`
  CTA are gone; membership is not mentioned anywhere on this page anymore.
- ✅ **Hero** — same `img1.jpg` 2026 photo background. Headline **"The admin work is getting
  automated. Your voice isn't."** Eyebrow states the 2027 event (Abbotsford, BC, June 4–6).
  CTA **"Get your ticket"** → `#tickets`. The microcopy below the CTA is the early-access promo
  message Jesse dictated verbatim: congratulations on finding the page before public
  announcement, **`SUPEREARLY`** for $200 off GA/VIP, **`EARLYVIRTUAL`** for $50 off Virtual
  (both codes rendered via a new `.code-chip` pill style in `styles.css`). Both discount codes
  already existed in Ticket Tailor when this was built (see §12) — no new discounts were created
  for this rewrite.
  - **AI framing, corrected 2026-10-01 (same day, twice).** First pass used "can't be automated" /
    "what AI can't replace" language throughout the hero and `#about`. Jesse flagged this as
    reading anti-AI, which contradicts the fact that Dan Koe's company **Eden** (an AI product) is
    becoming a major 2027 sponsor and many past attendees use it enthusiastically. Reframed once
    to "AI handles the admin work; that frees humans up to double down on what's uniquely theirs,"
    then reframed again (same day) because the hero still didn't quickly imply *who* the event is
    for, and because sentences shaped like "That's not competition, it's room to breathe" read as
    an AI-written tell (Jesse's words: any "it's not X, it's Y" contrast structure is a dead
    giveaway and should be avoided generally, not just here). Current hero sub-copy: **"Research,
    scheduling, organizing data increasingly run themselves. The people building one-person
    businesses and personal brands right now are using every modern tool for that, and spending
    the time it buys them going deeper on the parts nobody else can do."** This implies the
    audience (ahead-of-the-curve personal-brand / one-person-business builders who embrace modern
    tools while deepening their humanity) without stating it outright, and avoids the contrastive
    sentence pattern. This same AI-framing tension exists in the **§3 brand through-line** ("Build
    a creative business AI can't replace") — that tagline itself wasn't touched (out of scope for
    this page edit), but it's worth revisiting given the Eden sponsorship if it comes up again. No
    sponsor mention/credit was added to the page; Jesse said tone-fix only, revisit a sponsor
    placement once sponsorship details (logo, placement, credit wording) are finalized.
- ✅ **"What you're walking into"** (`#about`, new 2026-10-01, revised later same day) — a
  plain-language "what is this event" section that never existed on the page before (the
  pre-close archive sold the Sprint, not a summit). Title and framing went through two passes:
  the first called it "a working retreat, not a conference"; Jesse pushed back on two things
  (said 2026-10-01, second session): (1) it's fine to just call it a conference, no need to coin
  a term like "unconvention," just make clear what differentiates it from old-school business
  conferences, and (2) describe the 2026 crowd as **wisdom seekers building the new meaning
  economy**, people finding out how to earn a living without sacrificing their sense of deeper
  purpose. Current copy: title **"Three days built for wisdom seekers,"** section-intro names the
  meaning-economy framing, then a separate paragraph carries the AI-as-ally point (same framing as
  the hero) and the differentiators (live talks from people who've done the work, workshops you
  work in, long unstructured stretches with the room) without calling it "not a conference."
  States the day-by-day schedule (Fri 1pm start + welcome dinner / Sat 9am–4pm + VIP dinner /
  Sun 10am–3pm + after-party, pulled from the live Ticket Tailor event description, §12), and that
  a virtual ticket exists for anyone who can't travel (that closing paragraph was also rewritten
  to drop an "isn't just for X, it's for Y" construction — see the AI-slop note above). New
  `.schedule`/`.schedule__day` CSS in `styles.css`.
- ✅ **The story** (`#story`) — same 2026 narrative and all 17 named speakers with real photos
  (unchanged markup/images; see the historical bullets below for how those photos were sourced).
  One line added before the speaker grid, worded twice: first *"A few of 2027's speakers will be
  posted here as they're confirmed over the next 30 days. The full 2027 lineup will be announced
  publicly in early 2027"* (Jesse's framing from the first session); revised 2026-10-01 (second
  session) to a dated version instead, since visitors can't tell when an unstated "30 days" clock
  started: current copy is *"Some of the 2027 speaker lineup will be released in
  November/December, with the full lineup announcement coming in early 2027."* Also pushed into
  the live Ticket Tailor event description, §12, so the two don't contradict each other.
- ✅ **Photo gallery** (`#gallery`) — unchanged, all 39 photos, grid toggle, lightbox.
- ✅ **Testimonial wall** (`#proof`) — same 17 screenshots (`test9.png` still absent). Intro copy
  gained one closing sentence: *"This is the room 2027 is inviting you into."* **2026-10-02:**
  `.post` vertical spacing increased by a flat `+10px` on top of the existing responsive clamp
  (`margin: 0 0 calc(clamp(0.85rem, 1.5vw, 1.25rem) + 10px)`), and the mobile/touch hover-zoom
  (`.is-inview`, set by the IntersectionObserver for devices with no `:hover`) was split out from
  desktop's `:hover` and dialed back to **3/4 of the zoom amount**: desktop stays `scale(1.15)`,
  `.is-inview` is now `scale(1.1125)` (i.e. `1 + 0.15 * 0.75`) since 115% read as too exaggerated
  on small screens. `/membership`'s `.proof-trio` no longer exists to share this class with (that
  page was removed 2026-10-01), so this only affects `#proof` now.
- ✅ **Tickets** (`#tickets`, replaces the old `#summit-2027` waitlist section, 2026-10-01) — the
  page's primary CTA, still the `.member-band` component (renamed modifier
  `.member-band--tickets`, was `--waitlist`) with the gold-gradient headline treatment. Content is
  now an actual ticket sale, not a waitlist signup: a `.ticket-tiers` grid (new CSS,
  `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))` so it reflows cleanly whether
  it's 3 or 4 cards) showing **General Admission $497**, **VIP $1,497 (30 seats, featured)**,
  **Virtual $197**, and (added 2026-10-01, later session, as its own card rather than a line
  under GA) **After-Party $77** with Jesse's exact copy ("Get groovy on the dance floor and
  unwind after three packed days of taking notes and thinking deep"), noted as a GA add-on /
  included free with VIP; the SUPEREARLY/EARLYVIRTUAL promo repeated here too; and the same
  embedded Ticket Tailor checkout iframe as before, just renamed `.waitlist-embed` →
  `.ticket-embed` and **made 25% taller (700px → 875px)** per Jesse so the form is less likely to
  need an inner scroll. Fallback link text changed from "Join the waitlist directly" to "Buy your
  ticket directly." **Still not manually spot-checked rendering correctly** (Cloudflare's bot
  protection on `tickets.thelivinginternet.com` blocks automated checks) — check after next
  deploy, especially the new taller iframe height.
- ❌ **Become a member** (`#community`) — **removed entirely 2026-10-01.** Per Jesse, paid
  membership is being dropped from this page while the Alliance figures out a free-community
  model; `/membership` still exists as a page but has zero inbound links from `index.html` now.
  The `.whisper` CSS component this section used is kept in `styles.css` (unused on this page,
  same "keep shared classes even if currently unused" convention as elsewhere in this file) in
  case a quiet secondary-CTA band is needed again later.
- ✅ **A note from the founder** (`#founder`, new 2026-10-01) — small section just above the
  footer, new `.founder`/`.founder__*` CSS. Jesse's photo (reuses
  `assets/images/speakers/jesse-james-carver-web.jpg`) + a short first-person bio paragraph
  linking out to **jesse.eden.so** for the longer origin story and his personal work. This is the
  replacement for the membership mention: the page's only "something else from Jesse" pointer now.
- ✅ **Footer** — unchanged.

No countdown, no attendee modal, no pillars/journey/who-it's-for/FAQ/register panel/final CTA on
the live page. Those all still exist, unchanged, in `index-sprint-open-archive.html`.

### CTA wiring (live, in `index.html`, as of 2026-10-01)
- **Page order: hero → about (what the event is) → story (2026 proof) → gallery → testimonials →
  tickets (primary CTA, embedded checkout) → founder's note → footer.** Sell the event, prove it
  with 2026, close with the actual purchase.
- **Nav "Get your ticket" and hero CTA "Get your ticket"** both go to `#tickets`. No
  multi-step funnel anymore (the old "`/membership` → `#pricing` → checkout" three-step funnel
  from the membership era is gone along with membership itself) — `#tickets` embeds the real
  Ticket Tailor checkout widget directly, same iframe URL as before:
  `https://tickets.thelivinginternet.com/checkout/view-event/id/8531085/chk/ede5cd54da2d77b5125283f28206d958/?modal_widget=true&amp;widget=true`.
  That event series (`es_2274135`) is **published**, has a Stripe payment method attached, and
  (confirmed 2026-10-01) has real tickets on sale with nonzero `quantity_total` on all four ticket
  types — this is a live purchase flow, not a placeholder.
- No `href="#"` placeholders remain.
- The archived page's CTA wiring (Register → `#get-access`, checkout → Circle paywall) is
  documented at the top of that file's history; unchanged there.

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

**The membership paywall (live, verified 2026-08-05):** `https://living-internet-alliance.circle.so/checkout/membership`. Offers **both** $27/month and $260/year and grants **Premium Membership** (`46857`). This is the product sold by `/membership` and, more quietly since 2026-09-02, by `index.html`'s `#community` section.

**The 249-member mystery (needs cleanup):** the Sprint *space group* has 249 members but the *access group* `90-day-sprinters` has 0, and Premium has 118. So 249 people are stray space-group members (likely a bulk-add), not properly gated. Reconcile before opening paid spaces so the Sprint content is correctly gated by the access group.

**Attendee free-access sync (to do):** match the attendee spreadsheet (`Summit_Registrants_2026-2.xlsx`, 177 rows: FIRST NAME / LAST NAME / EMAIL; some email cells blank) against Circle members by email (name fallback) and add matches to `90-day-sprinters` (+ confirm Premium). Then attendees just log in. Claude can do this via the Circle MCP tools once the spreadsheet is re-provided.

**Sept 30 lapse (to do):** a scheduled task that moves the cohort Premium → Free Community at end of September (one-time charge behaves like a clean 3-month term, no surprise renewals).

**Sprint spaces to build** (in the Sprint space group): home/announcements, writing-challenge space (with the shared streak checklist), workshop hub (events + recordings), networking-call events, pod-coordination space, well-being resources.

---

## 12. Commerce (Ticket Tailor) & the 2027 summit tickets

Commerce historically runs on **Ticket Tailor** (`tickets.thelivinginternet.com`, Stripe-connected, store `st_73705`). The 2026 summit is event series `es_2057263` (in-person sold out; virtual was on sale).

**2027 tickets (live, confirmed 2026-10-01):** event series **`es_2274135`** "Future-Proof Creator Summit 2027." This has moved past the waitlist phase described in earlier sessions: **real tickets are on sale now**, confirmed via `event_series_by_id_get`:
- `tt_6491140` **General Admission** — $497, 120 total, on sale.
- `tt_6761732` **VIP Admission** — $1,497, 30 total, on sale.
- `tt_6761733` **Virtual Admission** — $197, 300 total, on sale.
- `tt_6761734` **After-Party Ticket** — $77, 120 total, GA add-on (included free with VIP).

Venue is correctly set to Abbotsford, BC, Canada (postal `V2S 7M7`) — the "stale Tempe, AZ placeholder" issue noted in earlier sessions is already resolved, no action needed. Dates: June 4–6, 2027, schedule (Fri 1pm start + 6pm welcome dinner / Sat 9am–4pm + 7pm VIP dinner / Sun 10am–3pm + 8pm after-party) lives in both the event series `description` field and `index.html`'s `#about` section — keep them in sync if either changes. Status `published`, Stripe payment method attached (`pm_163738`).

**Two discount codes already exist** (found via `discounts_get`, not created this session): `di_609532` **`SUPEREARLY`** ($200 fixed off `tt_6491140` + `tt_6761732`, i.e. GA/VIP) and `di_609533` **`EARLYVIRTUAL`** ($50 fixed off `tt_6761733`, Virtual). Both are referenced on the live page (hero microcopy + `#tickets`) as an early-access reward for finding the page before public announcement.

**The embedded checkout** on `index.html`'s `#tickets` section uses the direct checkout URL
`https://tickets.thelivinginternet.com/checkout/view-event/id/8531085/chk/ede5cd54da2d77b5125283f28206d958/?modal_widget=true&amp;widget=true` in an iframe (same URL used since the waitlist era, now serving real checkout since tickets are on sale). Height increased 700px → 875px 2026-10-01. **Still not manually spot-checked rendering correctly** — Cloudflare's bot protection on that domain blocks automated verification; check after the next deploy, especially that the taller iframe doesn't leave excess empty space if the form is shorter than expected.

⚠️ **Caution for future edits to this event series:** calling `event_series_update` (even for an unrelated field like `description`) returned a response body showing all ticket quantities and `total_issued_tickets` zeroed out and `next_occurrence_date: null`. A follow-up `event_series_by_id_get` immediately after confirmed the real data (quantities, 3 issued tickets, next occurrence date) was intact and correct — this appears to be a stale/transient echo in the update response itself, not actual data loss. Still, **always re-GET after any update to this event series to verify**, rather than trusting the update call's own response body.

---

## 13. Current status & next steps

**Done (2026-10-01):** `index.html` rewritten again, this time from a membership-funnel/waitlist
page into a **direct 2027 ticket-sale page** (§8), because the summit's registration had, by this
point, actually gone live on Ticket Tailor with real tickets (§12) rather than just a waitlist.
Added `#about` (what the event is) and `#founder` (note from Jesse, links to jesse.eden.so) as new
sections; replaced the old `#summit-2027` waitlist band with `#tickets` (ticket tiers + promo
codes + the same embedded checkout iframe, now taller); removed `#community`/membership from the
page entirely per Jesse (paid membership is being phased out of the Alliance's model, free
community TBD later); kept `#story`/`#gallery`/`#proof` (2026 proof) unchanged. Also fixed the
live Ticket Tailor event description's speaker-announcement sentence to match the page (§12).

**Open items from this pass:**
- ⚠️ **Manually spot-check the `#tickets` embed** after the next deploy (Cloudflare blocks
  automated checks of `tickets.thelivinginternet.com`): confirm the checkout widget renders at
  875px without excess empty space, and that both `SUPEREARLY` and `EARLYVIRTUAL` actually apply
  at checkout.
- **Speaker announcements:** the page and the Ticket Tailor description both now say "some of the
  2027 lineup in November/December, full lineup in early 2027" (Jesse's framing, 2026-10-01,
  revised same day to add the concrete months). Keep an eye on whether that timeline actually
  holds; it's a factual claim on a live page. If November/December passes without any names
  posted, that line needs updating before it becomes a broken promise.
- **`/membership` is now an orphaned page** (§6): still live at `/membership`, still a real
  product in Circle (§11), but nothing on `index.html` links to it anymore. Decide if it should
  stay up as a direct-URL-only page, get a deliberate new entry point once the free-community
  model is figured out, or be retired.
- **Loose extra photos** still sitting unorganized in `assets/images/` root, unmatched to any
  speaker: `hussain.png`, `jesseandtaylin.png`, `prisca.png`, `prisca2.png`, `prisca3.png`. Leave
  until Jesse says what they're for.
- **Gallery is still a flat, hand-maintained list** of 39 `<button class="gallery__item">`
  blocks in `#gallery` (unchanged by this pass). Jesse's documented workflow for adding more
  (rename into the `imgN.jpg` sequence, run the `sips -Z 1400` pipeline, add a button, delete the
  raw original) still applies if more photos show up.

**Historical (90-Day Sprint / membership era, now superseded by the above):** the old Sprint
registration page, the `/membership` build, the 2026-09-02 story/gallery restructure, and the
Circle access-group cleanup items (§11: the 249-member mystery, attendee spreadsheet sync, the
orphaned $147 recordings paywall, the Sept 30 Premium→Free lapse) are all still accurate
descriptions of past work and still-open Circle housekeeping, but are no longer the page's
priority now that membership has been dropped from `index.html`. Revisit §11 if/when the
free-community model gets decided.

**Open decisions:** the free-community model to replace paid membership (mentioned but not yet
designed, per Jesse); exact 2027 venue within Abbotsford (dates are locked: June 4–6, 2027,
region/city already confirmed in Ticket Tailor); whether `/membership` gets revived once that
model exists.

---

## 14. Working agreements for Claude

- Collaborative, iterative build. Check in before large moves.
- Match the established design tokens and conventions; do not introduce new colors, fonts, or libraries without asking.
- Keep all copy em-dash-free and on the warm, values-first, anti-hype voice.
- Consequential external actions (creating/charging via Circle or Ticket Tailor, bulk member changes, pushing/deploying) — confirm with Jesse first.
