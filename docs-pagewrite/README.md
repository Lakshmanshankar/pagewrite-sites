# docs-pagewrite

This is an Astro-based documentation project configured to deploy to Cloudflare Pages.

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

To run the local development server:

```bash
pnpm run dev
```

## 🛠️ Build

To build the static site for production, run:

```bash
pnpm run build
```

This will generate the static assets inside the `dist/` directory.

## ☁️ Deploy to Cloudflare Pages

To deploy and publish the project to Cloudflare Pages, make sure you have the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and are logged in.

Run the following command to deploy the generated `dist/` folder:

```bash
pnpm exec wrangler pages deploy ./dist --project-name=docs-pagewrite
```

### First-time Setup (Create Project)

If this is your first time deploying and you haven't created the Cloudflare Pages project yet, run the following command to initialize it:

```bash
pnpm exec wrangler pages project create docs-pagewrite --production-branch main
```
