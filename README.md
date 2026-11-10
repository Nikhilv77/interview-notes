# Interview notes

Personal interview preparation dashboard built with HTML, CSS and JavaScript.

Live site: https://nikhil-interview-notes.vercel.app

## Run locally

Run `python3 -m http.server 8000` from this directory, then open http://localhost:8000.

## Files

- `index.html` provides the page structure.
- `style.css` defines the responsive light and dark themes.
- `app.js` renders the study tracks and saves progress in browser localStorage.
- `filter.js` implements custom dropdown filters with keyboard controls.
- `data.js` contains questions and study checklists.
- `patterns.js` preserves the original tracker headings, descriptions and references.

The tracker includes 220 questions across 56 sections and starts with 50 completed questions. Progress is saved per browser and site address. Original Library resources are linked from the study pages.

## Deployment

Deploy the repository root as a static site with no framework or build command. The existing Vercel deployment was uploaded directly. Automatic deployments require linking this GitHub repository to the Vercel project.
