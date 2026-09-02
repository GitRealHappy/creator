# Launch checklist — 90-Day Creator Sprint page

Short steps to take the page live. Do these when you're fresh. Nothing here is urgent tonight.

---

## Step 1 — Preview it live (optional, do anytime)
From this folder on your Mac:

```bash
git add -A && git commit -m "New 90-Day Creator Sprint landing page" && git push
```

GitHub Actions deploys automatically. Within a minute it's viewable at your GitHub
Pages URL (the project URL, e.g. `https://gitrealhappy.github.io/creator/`). The domain
is untouched at this stage, so this is a safe preview.

---

## Step 2 — Circle paywall ✅ DONE
Paywall is live and wired into the page:
`https://living-internet-alliance.circle.so/checkout/90-day-creator-sprint`
Both Register buttons (price panel + final CTA) link to it.

Two things to double-check on the Circle checkout page itself (its own copy, not the
landing page):
- The description reads "this **-Day** Sprint" / "the **day** writing challenges" — looks
  like the number 90 dropped out of a field. Worth fixing in Circle.
- It says "not all perks will apply" for new joiners and names Laura Hanna + speakers,
  while the landing page sells the full Sprint and keeps speakers generic. Make sure the
  two read consistently so buyers aren't confused at the final step.

---

## Step 2b — Publish the 2027 waitlist ✅ DONE
The 2027 waitlist event (`es_2274135`, Future-Proof Creator Summit 2027) is published in
Ticket Tailor with a Stripe payment method attached. The "Join the 2027 waitlist" button
now points at the direct checkout link:
`https://tickets.thelivinginternet.com/checkout/view-event/id/8531085/chk/ede5cd54da2d77b5125283f28206d958/?modal_widget=true&widget=true`
(swapped in 2026-09-02, replacing the public event-series page URL). Placeholder dates
Jun 4–6 2027 are still tentative; change them anytime in the TT dashboard. Emails collect
under the event's waitlist signups.

---

## Step 3 — Custom domain (www.thelivinginternet.com)
A `CNAME` file containing `www.thelivinginternet.com` now lives in the repo root. This is
what tells GitHub Pages the custom domain; **do not delete it**, and avoid force-pushing
over history without it (that's what knocked the domain out before).

Because this project repo carries that CNAME, Pages serves the site at the **root** of
`www.thelivinginternet.com` (not under `/creator/`), so relative paths to `styles.css`
and images resolve correctly.

DNS (at your registrar) should have:
- `www` → CNAME → `gitrealhappy.github.io`

If the domain worked before the force push, this record already exists. Confirm the
GitHub Pages setting still shows `www.thelivinginternet.com` after the next deploy.

---

## Things I'll handle with you later (no rush, not launch blockers)
- **Attendee free access:** match your 177-registrant spreadsheet to Circle members and
  add them to the **90-day-sprinters** access group, so attendees just log in.
- **The 249 cleanup:** the Sprint *space group* has 249 stray members while the sprinter
  *access group* has 0. We'll reconcile so paid spaces are gated correctly before launch.
- **Sept 30 lapse:** a scheduled task that moves the cohort Premium → Free Community.
- **Sprint spaces:** build out announcements, the writing-challenge space (with the shared
  streak checklist), workshop hub, networking-call events, pod space, well-being space.
- **2027 waitlist:** decide between a Google Sheet + Apps Script form or the Ticket Tailor
  waitlist, then wire the "Join the 2027 waitlist" button.

---

## Status right now
- Page is fully built (hero → footer), em-dash-free, mobile-tuned, countdown live.
- 3 links still placeholder (`TODO` in `index.html`): two Register buttons + waitlist.
- Repo auto-deploys to GitHub Pages on push to `main`.
