# BlockLog website

Static pages for BlockLog, published with GitHub Pages: a landing page, a
privacy policy and a support page. These are the URLs App Store Connect asks
for.

This repository is deliberately **separate from the app's source** and
contains no code, screenshots of real data or personal information — it is
public.

## Files

- `index.html` — landing page (marketing URL)
- `privacy.html` — privacy policy (Privacy Policy URL, required)
- `support.html` — support and contact (Support URL, required)
- `style.css`, `icon.png`, `favicon.png` — shared assets; no external requests
- `.nojekyll` — tells Pages to serve the files as they are

## Publishing (once)

1. On GitHub create a **public** repository, e.g. `blocklog-site`, and push
   this folder to its `main` branch.
2. Repository → Settings → Pages → Build and deployment → Source: *Deploy from
   a branch*, Branch: `main`, folder `/ (root)`. Save.
3. After a minute the site is at `https://<username>.github.io/<repo>/`.
4. In App Store Connect use `<site>/privacy.html` as the Privacy Policy URL,
   `<site>/support.html` as the Support URL and `<site>/` as the Marketing URL.

## Keeping it true

The privacy policy must match what the app does. **Planned change that requires an
update:** the location-based "scan your flight times" notification (app repo,
CLAUDE.md open task #9) — the policy currently says the app does not use
location (and does not list a notification permission). Re-read `privacy.html`
whenever the app gains a network call, a new permission, an analytics or
crash-reporting tool, or a new kind of stored data, and update the effective
date at the top.
