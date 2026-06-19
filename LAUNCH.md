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

## Step 2b — Publish the 2027 waitlist (~30 sec, only you can do this)
The 2027 waitlist event is built in Ticket Tailor and the page button is wired to it,
but Ticket Tailor won't make any event live until a payment method is attached (even a
waitlist-only one). In the TT dashboard:
1. Open **Future-Proof Creator Summit 2027**.
2. Attach your existing Stripe payment method to the event.
3. **Publish** it.
That's it. The "Join the 2027 waitlist" button then works:
`https://tickets.thelivinginternet.com/events/thelivinginternetalliance/2274135`
(Placeholder dates Jun 4–6 2027 are tentative; change them anytime. Emails collect under
the event's waitlist signups.)

---

## Step 3 — Point the domain (when ready to go fully public)
This is the cutover from Framer to GitHub Pages. When you say go, I'll add a `CNAME`
file containing `thelivinginternet.com`, then you update DNS at your registrar:

- Apex `thelivinginternet.com` → A records:
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `www` → CNAME → `gitrealhappy.github.io`

(I'll confirm exact values against GitHub's current docs at cutover time.)

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
