# ZurplexAI

Frontend application connected to [Lovable](https://lovable.dev), built with TanStack Start, React, Vite, and Tailwind CSS.

## Local development

This repository includes a `bun.lock` file, so the commands below use [Bun](https://bun.sh/).

```bash
bun install
bun run dev
```

## Available commands

- `bun run build`: create a production build.
- `bun run build:dev`: create a development-mode build.
- `bun run preview`: preview the production build locally.
- `bun run lint`: run ESLint.
- `bun run format`: format the codebase with Prettier.

## Lovable synchronization

Commits pushed to the connected branch sync back to Lovable. Avoid rewriting published history with force pushes, rebases, amended commits, or squashes, because doing so can remove project history from Lovable.
