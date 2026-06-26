# This is eXobe B2B Marketplace Hub

eXobe is a high-conversion, mobile-first retail marketplace designed to empower African entrepreneurs and buyers. the platform features lightning-fast catalog search, live multi-field smart querying, and zero-interest fintech payment simulations tailored for the regional ecosystem.

### 1 Setup Instructions & Deployment

Live deployed link [Link to website](https://exobe-marketplace-app.vercel.app/listings)

git clone https://github.com/nothil/exobe-marketplace-app.git

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run dev
```

Application running on: http://localhost:3000

## 2 Stack & AI Tools Used

- For frontend Architecture chosen for clean type-safe structures and server-rendered deployment performance.
- Next.js
- TypeScript
- Tailwinds, css
- Zustand
- copilot to speed the code generation
- Gemini for research

## Features

- For this project I added a currency change feature, a user is able to use a preferred currency since eXobe trade across the continent.
- Mobile-First Responsive Design: Engineered with a strict thumb-zone interface layout, built entirely for the smartphone-driven African business market.
- Smart Search Engine: An intelligent search bar parsing queries across product titles, category tags, item descriptions, and city locations concurrently with instant typeahead suggestions.

## 3 What I Chose Not to Build

- Database & Auth Integration: Deliberately left out Prisma, PostgreSQL, and NextAuth schemas. I prioritized building a high-fidelity interactive search interface first rather than spending time setting up boilerplate CRUD state management.

### Key Architecture Routes

- /listings The core discovery hub catalog, slideshow, and smart search controls.

- /listings/[id] - Dynamic production detail pages with interactive cart parameters.

- /onboarding - The Multi-step Vendor Portal and enterprise launch terminal.

- /cart - The global shopping basket overview showing the live PayJustNow timeline split.

- /orders - The historical buyer escrow procurement tracking board.

## Deploy on Vercel

### This website is deployed on vercel you can check it out
