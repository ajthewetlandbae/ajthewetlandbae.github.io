# AJ the Wetland Bae — Portfolio Website, Version 3

This is a static website: no backend, monthly hosting service, or build tools are required. It can be hosted on **GitHub Pages**.

## Preview
Unzip the package, then open `index.html` in a browser. For the most reliable local preview, use VS Code Live Server or run `python -m http.server 8000` in this folder and open `http://localhost:8000`.

## Edit photos, links, video and CV without changing the website layout
Open `content.js` in GitHub's built-in file editor and edit the values inside `SITE_CONTENT`:

- `portrait`: upload your portrait to the `photos` folder and set `portrait: 'photos/portrait.jpg'`.
- `cv`: upload an address-free public CV PDF to `assets`, e.g. `cv: 'assets/AJ_CV.pdf'`.
- `paper`: provide the verified DOI or actual preprint URL; the button activates.
- `dataset`: provide the public HydroShare dataset URL; the button activates.
- `linkedin`, `github`, `email`: update profile/contact links. The email is entirely optional.
- `gallery`: add photo paths and change individual captions; you can add more entries, using one of `field`, `conference`, `outreach`, `beyond` as the category.
- `videos`: add public YouTube or Vimeo watch URLs; supported ones become in-page embeds. Other platforms would need their embed code added separately.
- `media`: replace placeholder titles, descriptions and URLs with verified articles and videos.

No need to upload content twice: **you can edit `content.js` and upload photos directly to the GitHub repository after the site is online**. You can also ask ChatGPT to make changes and upload a replacement file if you prefer.

## Publish on GitHub Pages
1. Log in to GitHub and create a **public** repository exactly named `ajthewetlandbae.github.io` 
2. Upload the **contents of this folder**, including `index.html`, `styles.css`, `script.js`, `content.js`, `assets/`, and `photos/` into the repository root. Do **not** upload only the ZIP file.
3. In the repository, go to **Settings → Pages**; choose **Deploy from a branch**, branch **main**, folder **/(root)**. Save.
4. The public website address will ordinarily be `https://ajthewetlandbae.github.io/` after publishing. Check the live Pages settings for deployment status.
5. To update later, choose a file in the repository, click its edit (pencil) icon, change the value, then **Commit changes**. Pages will rebuild the site automatically. For images and PDFs, choose **Add file → Upload files**.

## Editing text and colors
Change written paragraphs in `index.html`. All design colors are near the top of `styles.css` under `:root`. If you want professional editing support later, share the updated site ZIP or point to your public repository.


