# CLAUDE.md — 90-Day Creator Sprint Landing Page

Project context for any Claude session working in this repository. Read this first.

> **Picking this up in a fresh chat?** Jump to **§13 Current status & next steps** for exactly
> where things stand and what's left. Two things from the previous session do NOT carry over and
> may need re-providing: the **attendee spreadsheet** (`Summit_Registrants_2026-2.xlsx`, was an
> upload) and the companion planning doc `creator-sprint-landing-plan.md` (lived in the session
> scratchpad, not in this repo).

---

## 1. What this is

This repo holds the **landing page for the 90-Day Creator Sprint**, a program run by **The Living Internet Alliance**. The page is the homepage of **`www.thelivinginternet.com`** and **replaces** the now-finished Future-Proof Creator Summit 2026 landing page (which was a Framer site).

The page has one job: **convert visitors into Sprint registrants** before registration closes at **2:00 PM PDT on June 30, 2026**. The Sprint runs **July 1 – September 30, 2026**. There are no late entries.

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
├── index.html              Single-page landing page (+ inline JS: modal & countdown)
├── styles.css              All styles (dark theme, design tokens in :root)
├── CNAME                   Custom domain for GitHub Pages: www.thelivinginternet.com
├── CLAUDE.md               This file
├── LAUNCH.md               Step-by-step go-live checklist (deploy, paywall, waitlist, DNS)
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
    │   └── img2,3,4,7,9..15.jpg   Other summit photography (img8 removed).
    └── testimonials/
        └── test1..test17.png      Voluntary social-post screenshots.
                                    NOTE: test9.png is absent → 16 images, not 17.
```

**Tech:** plain static HTML + CSS, no build step, no framework. Two small vanilla-JS blocks in `index.html`: the attendee modal (open/close, Esc, focus handling) and the registration countdown. Fonts load from Google Fonts (Fraunces, Inter, Montserrat). Keep it dependency-free unless there's a strong reason not to.

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

## 8. Page structure (all sections built ✅)

- ✅ **Nav** — white logo + Montserrat-bold wordmark, ghost Register button (→ `#get-access`), anchor links. **Solid black bar** with hairline bottom border on both desktop (fixed) and mobile (sticky). `scroll-padding-top: 84px` keeps anchored sections clear of the fixed header.
- ✅ **Hero** — `img1.jpg` background with a legibility scrim, eyebrow, Fraunces headline ("The summit ended. The change is just beginning."), one-line Sprint definition ("…keeps you building when your motivation runs dry. Turn your peak experience into a high-altitude plateau state."), primary CTA (→ `#get-access`), deadline microcopy. (The hero's own attendee line was removed as redundant with the attendee strip.)
- ✅ **Attendee modal** — attendees already have access; if they lack it they email jesse@thelivinginternet.com. Opened from the attendee strip's "Find your access" button (`data-modal-open="attendee"`).
- ✅ **Attendee strip** (`#attendees`) — slim raised band "For 2026 summit attendees"; access included, button opens the modal.
- ✅ **What the Sprint is** (`#what`) — six pillars, editorial hairline-divider grid (01–06, Fraunces titles), benefit-framed.
- ✅ **The 90-day journey** (`#journey`) — Month 1→2→3 timeline on pure black. Node dots on a connector that fades past day 90; stacks to a left-rail vertical timeline ≤820px. Signature section.
- ✅ **Photo strip** (top of `#proof`) — img6 / img5 / img14 as uniform 3:2 cards, "the room," leading into the wall. On ≤760px the first photo spans full width.
- ✅ **Testimonial wall** (`#proof`) — CSS multi-column masonry of 16 screenshots (`test9.png` absent). Aspect ratios ~4:1 to ~0.7:1; no cropping. Native-post chrome, hover lift. Lead-in: "Nobody asked them to post these." 3 → 2 (≤1024px) → 1 (≤600px) cols.
- ✅ **Who it's for / not for** (`#who`) — two-column honest qualifier (✓ / ✕), stacks ≤760px.
- ✅ **Price & registration** (`#register`) — black band; centered $177 panel (`id="get-access"`) with includes list, **live countdown**, CTA → Circle checkout, deadline mechanics, first-month full-refund line.
- ✅ **2027 Summit whisper** (`#summit-2027`) — slim raised band; "first twenty sold out in pre-sale," ghost "Join the 2027 waitlist" button → Ticket Tailor.
- ✅ **FAQ** (`#faq`) — `<details>` accordion, no JS, +/− markers. Seven locked answers (§10).
- ✅ **Final CTA** — "The room is still warm." Pure-black close, register button → Circle checkout, deadline microcopy. Footer follows (wordmark, jesse@ contact, © + Privacy/Terms links to `/privacy-policy` and `/terms-of-service` — confirm those pages still exist).

### CTA wiring (live)
- **Hero + nav Register buttons** → `#get-access` (scroll to the price panel so the actual Register button + countdown are in view). By design, not direct to checkout.
- **Price-panel CTA + final-CTA button** → `https://living-internet-alliance.circle.so/checkout/90-day-creator-sprint` (live Circle paywall).
- **Join the 2027 waitlist** → `https://tickets.thelivinginternet.com/events/thelivinginternetalliance/2274135` (Ticket Tailor; **needs publishing**, see §12).
- No `href="#"` placeholders remain.

---

## 9. Deadline & countdown mechanics

- **Registration closes:** 2:00 PM PDT, June 30, 2026. Always state the exact time, not just the date.
- **Sprint starts:** July 1, 2026. No late entries (pods form together).
- **Countdown:** built. In the `#register` panel, counts down to the fixed instant **`2026-06-30T21:00:00Z`** (14:00 PDT / UTC-7), correct in every time zone. Vanilla JS in `index.html`; on expiry swaps to "Registration has closed. The Sprint has begun."

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

**Done:** full page built (hero → footer), em-dash-free, mobile-tuned, solid black header, hero CTA lands on the price panel, live countdown, Circle paywall wired into both Register CTAs, 2027 waitlist created + wired, `CNAME` added, `LAUNCH.md` written.

**Pending (rough priority):**
1. **Push + confirm the domain is live** at `https://www.thelivinginternet.com/` (commit the `CNAME`; check DNS `www` → `gitrealhappy.github.io` and the Pages custom-domain setting).
2. **Publish the 2027 waitlist** in Ticket Tailor (attach Stripe → Publish) — only Jesse can; §12.
3. **Fix the Circle checkout page copy** (the missing "90", "not all perks," speaker naming) — §11.
4. **Attendee access sync** from the spreadsheet → `90-day-sprinters` (re-provide the xlsx) — §11.
5. **Clean up the 249** stray space-group members so Sprint spaces are access-gated — §11.
6. **Schedule the Sept 30 lapse** (Premium → Free) — §11.
7. **Build out the Sprint spaces** in Circle — §11.

**Open decisions:** renewal pricing/offerings after September; refund window wording ("first month" from July 1 or purchase date); whether 2026 speakers can be named (currently generic); final hero headline/voice lock.

---

## 14. Working agreements for Claude

- Collaborative, iterative build. Check in before large moves.
- Match the established design tokens and conventions; do not introduce new colors, fonts, or libraries without asking.
- Keep all copy em-dash-free and on the warm, values-first, anti-hype voice.
- Consequential external actions (creating/charging via Circle or Ticket Tailor, bulk member changes, pushing/deploying) — confirm with Jesse first.
