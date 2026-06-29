# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Arcade Vault is an online gaming platform where players compete for the highest scores.

## Stack and versions

- **Next.js 16.2.9** — breaking changes vs. earlier versions; always read `node_modules/next/dist/docs/` before writing Next.js-specific code
- **React 19.2.4** — App Router uses React canary features
- **Tailwind CSS v4** — configured via `postcss.config.mjs`; uses `@import "tailwindcss"` and `@theme inline` (not the v3 `tailwind.config.js` approach)
- **TypeScript** — strict mode enabled; path alias `@/*` maps to the repo root

## Skills
Usa siempre /frontend-design para diseñar la interfaz de usuario.

## Architecture

Uses the Next.js **App Router** (`app/` directory):

- `app/layout.tsx` — root layout with Geist fonts and global CSS variables
- `app/globals.css` — Tailwind import and CSS custom properties (`--background`, `--foreground`); dark mode via `prefers-color-scheme`
- `app/page.tsx` — home route

## ESLint

Flat config format (`eslint.config.mjs`) using `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`. No `.eslintrc` file.
