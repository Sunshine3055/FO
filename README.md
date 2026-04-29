# Florence Greenscapes LLC Website

A ready-to-deploy Vite + React website for a small landscaping LLC offering:
- Landscaping consulting and design
- Landscape maintenance
- Outdoor lighting
- Irrigation systems
- Hardscape support

## How to Run Locally

1. Install Node.js from https://nodejs.org
2. Open Terminal or Command Prompt inside this folder
3. Run:

```bash
npm install
npm run dev
```

Then open the local link shown in the terminal, usually:

```bash
http://localhost:5173
```

## Build for Production

```bash
npm run build
```

The production files will be created in the `dist` folder.

## Deploy to Vercel

1. Upload this project to GitHub
2. Go to Vercel
3. Import the GitHub repository
4. Framework preset: Vite
5. Build command: `npm run build`
6. Output directory: `dist`

## Where to Edit Business Info

Open:

```bash
src/main.jsx
```

Edit this section:

```js
const business = {
  name: "Alhambra Greenscapes LLC",
  phone: "(626) 555-0188",
  email: "hello@alhambragreenscapes.com",
  serviceArea: "Alhambra, Pasadena, San Gabriel Valley & nearby communities"
};
```

## Replace Website Images

The current website uses sample image URLs. Replace them with the client's real photos later.

Recommended individual photos:
1. Home hero: finished landscape project
2. Services: design consultation
3. Maintenance: pruning/detail work
4. Portfolio: hardscape/walkway
5. Irrigation: drip/sprinkler system
6. About/Contact: team photo and service truck
