# CLAUDE.md — 90-Day Creator Sprint Landing Page

Project context for any Claude session working in this repository. Read this first.

---

## 1. What this is

This repo holds the **landing page for the 90-Day Creator Sprint**, a program run by **The Living Internet Alliance**. The page lives at the root of `thelivinginternet.com` and **replaces** the now-finished Future-Proof Creator Summit 2026 landing page.

The page has one job: **convert visitors into Sprint registrants** before registration closes at **2:00 PM PDT on June 30, 2026**. The Sprint runs **July 1 – September 30, 2026**. There are no late entries.

### The product being sold
The **90-Day Creator Sprint** is a guided integration program for digital creators. For people who did not attend the 2026 summit, it costs **$177 USD** and includes **3 months of Premium Living Internet University membership** plus full Sprint access. Summit attendees already hold a year of membership and get the Sprint at no extra cost.

The Sprint consists of six pillars:

1. **Three one-month writing challenges** — optional; 15 minutes/day of undistracted writing with group accountability.
2. **Eight speaker workshops** — live webinars across the 90 days with speakers from the 2026 summit (kept generic, not named, for now). Usually Thursday evenings and Saturday mornings PDT. All recorded.
3. **Monthly networking calls** — a 2-hour community hangout each month for creators to share grievances, goals, and celebrations.
4. **Mental well-being resources** — a growing pool of support for the isolation of digital entrepreneurship.
5. **Facilitated accountability pods** — self-governing groups of 4 to 6 people who meet weekly on a loose structure. Pods mix 2026 summit attendees (about 100 people were at the in-person event) with new registrants. Sorted by time zone, creative focus area, and grouping requests via an intake survey (the survey arrives in the welcome email flow, not on this page).
6. **The online community** — a home base in Circle with spaces to chat, share work in progress, and trade feedback. Also hosts the full recordings of the 2026 Future-Proof Creator Summit, which is a real draw for non-attendees.

### The 90-day spine (used in the "journey" section)
- **Month 1 — Foundations / "Show up."** Writing Challenge #1, pods form, first networking call, ~3 workshops. Build the daily practice.
- **Month 2 — Momentum / "Go deeper."** Writing Challenge #2, networking call #2, ~3 workshops. The messy middle where most people quit and the pod carries you.
- **Month 3 — Integration / "Make it yours."** Writing Challenge #3, celebration call, final ~2 workshops. The practice becomes who you are.

(Workshop distribution 3/3/2 is a placeholder; adjust to the real schedule.)

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
- Wordmark ("The Living Internet Alliance"): **Montserrat, Bold (700), always.** This is a hard rule. It has its own `--wordmark` CSS variable.

**Color tokens** (see `:root` in `styles.css`):
- `--ink` `#0a0a0a` page base, `--ink-2` `#121212` raised surfaces, `--black` `#000`.
- `--text` `#f2f0ec` warm white, `--text-dim` muted, `--text-faint` faintest.
- `--paper` `#f4f1ec` warm off-white for large display text.
- `--accent` `#e8c89a` — a reserved warm accent, **currently unused.** CTAs are pure white-on-black to honor the black-and-white direction. Only introduce the accent if the user explicitly asks (candidate uses: price emphasis, countdown).

**Motion:** subtle and tasteful only. Slow hero zoom drift, scroll cue pulse, modal/fade entrances. All disabled under `prefers-reduced-motion`.

**Social proof rendering:** testimonial screenshots should appear as *real social posts in their native chrome* (X / Instagram frames), not reformatted into clean pull-quotes. The unsolicited authenticity is the asset. A masonry/scrapbook wall is the intended treatment.

**Design signature:** the page should feel like a *journey* (90 days, three arcs), not an event (one weekend). Imply forward motion via the Month 1 → 2 → 3 timeline. This is what visually distinguishes a $177 program from a list of perks.

---

## 5. Writing conventions (hard rules)

- **Never use em dashes (—) in copy.** Use colons, commas, periods, or middots (·) instead. This applies to all visible page copy. (En dashes in number/date ranges like "July 1 – Sept 30" are acceptable.)
- Write to one person, second person ("you"), present tense.
- Name the loneliness of creating directly; the well-being pillar earns it.
- Avoid hype language: "transform your life," "unlock," "10x," stacked countdown timers.
- Earn every urgency claim with a real reason. The only honest scarcity here is structural: pods form together on July 1, so you genuinely cannot join late. Lean on that truth rather than fake "spots left."

---

## 6. File structure

```
/
├── index.html              Single-page landing page
├── styles.css              All styles (dark theme, design tokens in :root)
├── CLAUDE.md               This file
└── assets/
    └── images/
        ├── graphics/
        │   └── logo-white.png        White square logo (470x470, transparent)
        ├── summit-photos/
        │   └── img1.jpg .. img15.jpg  Summit photography
        │       (img1.jpg = hero: Jesse holding the mic before the speaker
        │        panel, everyone happy. Wide 3600x1925, dark backdrop.)
        └── testimonials/
            └── test1.png .. test17.png  Voluntary social-post screenshots
```

**Tech:** plain static HTML + CSS, no build step, no framework. One small vanilla-JS block in `index.html` powers the attendee modal (open/close, Esc, focus handling). Fonts load from Google Fonts. Keep it dependency-free unless there's a strong reason not to.

---

## 7. Page structure (build order)

Sections marked ✅ are built; the rest are stubbed as `.placeholder` blocks in `index.html` and built top-down.

- ✅ **Nav** — white logo + Montserrat-bold wordmark, ghost Register button, anchor links. Fixed/transparent on desktop; solid black sticky bar on mobile (photo sits below it).
- ✅ **Hero** — `img1.jpg` background with a legibility scrim, eyebrow, Fraunces headline ("The summit ended. The change is just beginning."), one-line Sprint definition, primary CTA ($177), deadline microcopy, and the attendee modal trigger.
- ✅ **Attendee modal** — explains attendees already have access; if they lack access they email jesse@thelivinginternet.com.
- ✅ **Attendee strip** (`#attendees`) — slim raised black band flagged "For 2026 summit attendees"; reassures access is included, ghost button opens the attendee modal.
- ✅ **What the Sprint is** (`#what`) — the six pillars in an editorial hairline-divider grid (numbered 01–06, Fraunces titles), framed as benefits not features.
- ✅ **The 90-day journey** (`#journey`) — Month 1→2→3 timeline on a pure-black band. Three arcs (Foundations/Momentum/Integration) with node dots on a horizontal connector that fades out past day 90; stacks to a left-rail vertical timeline ≤820px. Signature section.
- ✅ **Testimonial wall** (`#proof`) — CSS multi-column masonry of the voluntary social screenshots (currently 16; `test9.png` is absent from the folder). Aspect ratios run ~4:1 to ~0.7:1; masonry tolerates them with no cropping. Native-post chrome preserved, subtle framed cards, hover lift. Lead-in: "Nobody asked them to post these." 3 cols → 2 (≤1024px) → 1 (≤600px).
- ✅ **Who it's for / not for** (`#who`) — two-column honest qualifier (for-you ✓ / not-for-you ✕), stacks ≤760px.
- ✅ **Price & registration** (`#register`) — black band, centered $177 panel with includes list, **live countdown** to the deadline, CTA, deadline mechanics, and the first-month full-refund line.
- ✅ **2027 Summit whisper** (`#summit-2027`) — slim raised band; "first twenty sold out in pre-sale," ghost "Join the 2027 waitlist" button.
- ✅ **FAQ** (`#faq`) — `<details>` accordion, no JS, +/− markers. Seven locked answers from section 9.
- ✅ **Final CTA** — "The room is still warm." Pure-black close, register button, deadline microcopy. Followed by footer (wordmark, contact, © + Privacy/Terms links).

### Placeholder links
- ✅ Register buttons (`#register` panel + final CTA) → wired to the live Circle paywall:
  `https://living-internet-alliance.circle.so/checkout/90-day-creator-sprint`. Hero and nav
  Register buttons funnel to `#register` first (by design).
- ⬜ "Join the 2027 waitlist" in `#summit-2027` → still `href="#"`; waitlist mechanism undecided.
- Footer Privacy/Terms point to `/privacy-policy` and `/terms-of-service` (carried over from the summit site; confirm they still exist).

### Responsive behavior
- **Desktop:** full-bleed hero, photo behind floating transparent nav.
- **≤860px (tablet/mobile):** hero unstacks. Solid black sticky header; photo becomes its own 42vh block below it; photo's bottom fades into solid black; copy sits on black below. Buttons go full-width.

---

## 8. Deadline & countdown mechanics

- **Registration closes:** 2:00 PM PDT, June 30, 2026. Always state the exact time, not just the date.
- **Sprint starts:** July 1, 2026. No late entries (because pods form together).
- **Countdown:** built. Lives in the `#register` panel, counting days/hours/minutes/seconds to the fixed instant **`2026-06-30T21:00:00Z`** (14:00 PDT / UTC-7), so it is correct in every visitor's time zone. Vanilla JS in `index.html`; when the deadline passes it swaps to "Registration has closed. The Sprint has begun." (Optional future polish: make it grow more prominent in the final ~48 hours.)

---

## 9. FAQ answers (locked)

- **Do I need to have attended the summit?** No.
- **What if I miss a workshop live?** Everything is recorded.
- **When are live sessions?** Workshops usually Thursday evenings + Saturday mornings PDT; monthly networking calls. All times Pacific.
- **Is the writing challenge mandatory?** No, it's optional.
- **What happens after 90 days (end of Sept)?** Premium membership lapses; there's an option to renew at new pricing with different, lighter offerings than the Sprint. Frame the Sprint's intensity as the point; renewal is for staying connected, not a clone. Note: the **free** community spaces (e.g. the maker space chat) stay open after Premium lapses; only the premium spaces close. (Stated in pillar 06 on the page.)
- **Refunds?** Unhappy in the first month, full refund. (Give this real estate; it's a genuine trust signal. Open item: does "first month" run from July 1 or from purchase date?)
- **How are pods grouped?** Time zone, creative focus area, and grouping requests via an intake survey.

---

## 10. Circle setup (operational, off-page)

The community is hosted in **Circle**. The page needs two entry paths:

- **Non-attendees ($177):** a paid product/membership in Circle for 3 months of Premium access; primary CTA links to that checkout; buyer lands in the Sprint space(s).
- **Attendees (free):** must not see a paywall. Plan: match the Circle access group against Jesse's spreadsheet of summit attendees (cross-reference on email, name as fallback) and add matched people to the Sprint access group, so their CTA is simply "Enter the Sprint." Claude can do this cross-reference using the connected Circle tools plus the spreadsheet.

Sprint spaces to create in Circle: Sprint home/announcements, writing-challenge space(s), workshop hub (events + recordings), networking-call events, pod-coordination space, well-being resources.

---

## 11. Open items / decisions still needed

- Renewal pricing & offerings after September (even rough numbers help the after-90 FAQ).
- Refund window wording: "first month" from July 1 or from purchase date.
- Whether 2026 speakers can be named (currently kept generic).
- Final hero headline + overall voice lock (current headline is a strong candidate, not final).

---

## 12. Working agreements for Claude

- This is a collaborative, iterative build. Build section by section, top-down, and check in before large moves.
- Match the established design tokens and conventions above; do not introduce new colors, fonts, or libraries without asking.
- Keep all copy em-dash-free and on the warm, values-first, anti-hype voice.
- The companion planning doc with fuller copy direction lives in the session outputs as `creator-sprint-landing-plan.md`; this CLAUDE.md is the durable in-repo summary.
