# Fabric Assignment

## Pre-requisites

- [Node.js latest LTS](https://nodejs.org/en/download/current) (recommended version 22.x LTS or above)
- [PNPM](https://pnpm.io/installation)
- [VSCode](https://code.visualstudio.com/download) (optional, but recommended)
- [Biome extension for VSCode](https://biomejs.dev/reference/vscode/) (optional, but recommended)

## Tech stack

- [Playwright](https://playwright.dev/docs/intro)
- [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Biome](https://biomejs.dev/guides/getting-started/)

## Setup

1. Install dependencies:

```bash
pnpm install
```
2. Run the tests:

```bash
pnpm test:ui
```
3. Run the linter:

```bash
pnpm lint
```
4. Check the code formatting:

```bash
pnpm format
```
5. Fix the code formatting:

```bash
pnpm format:fix
```
6. Fix linting issues:

```bash
pnpm lint:fix
```
7. Open the Playwright report:

```bash
pnpm report
```

## Project Structure

- `src/pages/`: Contains all the UI page objects.
- `src/tests/`: Contains all the test related files.