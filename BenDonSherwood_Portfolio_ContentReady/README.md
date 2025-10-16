# Ben Don Sherwood — Portfolio (GitHub Pages)

## Replace with real artwork
1) Put images/videos in `/images` (supports JPG/PNG/GIF/MP4).
2) Edit `gallery.json` and point `src` to your files. `thumb` is optional for grid thumbnails.
3) The résumé is linked at `docs/Ben_Sherwood_Disney_Application.pdf`. Replace if needed.

## Publish on GitHub Pages
- Upload everything to your repo root.
- Settings → Pages: Deploy from branch → `main` / (root).
- For custom domain, set `www.bendonsherwood.com` and follow DNS steps.

## Example gallery item
```json
{
  "title": "Shot 12 — Lip Sync",
  "src": "images/shot12.mp4",
  "thumb": "images/shot12_thumb.jpg",
  "tags": ["animation","lipsync"],
  "year": "2025"
}
```