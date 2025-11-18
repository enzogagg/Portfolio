Local FontAwesome installation

To avoid third-party cookies being set by the Cloudflare CDN, host FontAwesome locally.

Steps to self-host FontAwesome Free (Quick):

1. Download the free FontAwesome web package (CSS + webfonts) from:
   https://fontawesome.com/download

2. Extract the archive and copy the following into this project:
   - Copy the `css/all.min.css` into `assets/fonts/fontawesome/css/all.min.css`
   - Copy the `webfonts/` directory into `assets/fonts/fontawesome/webfonts/`

3. After copying, either:
   - Replace `local-fontawesome.css` with the real `all.min.css`, or
   - Edit `local-fontawesome.css` and add `@import url("./all.min.css");` on the first line.

Notes:
- Ensure the paths inside `all.min.css` reference `../webfonts/` or adjust as needed.
- Hosting FontAwesome locally removes requests to `cdnjs.cloudflare.com` and prevents those cookies from being set.
- This repository intentionally does not include FontAwesome binary/font files to avoid redistributing third-party assets.

If you'd like, I can continue and:
- Download and add the free FontAwesome files for you (requires network access/permission), or
- Convert commonly used icons to inline SVGs to remove dependency on FontAwesome entirely.
