# GeoJSON Display with WebGL

This project demonstrates how to **render GeoJSON country boundaries using WebGL** in the browser.  
It is built using **Vite**, **Vanilla JavaScript**, and **TypeScript** for a fast and minimal development workflow.

The project focuses on:

- Parsing GeoJSON data
- Mapping geographic coordinates to screen space
- Rendering country shapes using WebGL primitives

---

## 🚀 Tech Stack

- **Vite**
- **Vanilla JavaScript**
- **TypeScript**
- **WebGL / WebGL2**
- **HTML Canvas**

---

## 🌍 GeoJSON Data Source

The GeoJSON country data is sourced from:

🔗 **Countries Low Resolution GeoJSON**  
https://gist.github.com/MichaelVerdegaal/a5f68cc0695ce4cf721cff4875696ffc#file-countries_lowres-geo-json

The dataset contains simplified country polygons suitable for visualization and performance-friendly rendering.

---

## 📁 Project Structure

```text
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── utils/
│   │   ├── geo-json-type.ts   # Minimal GeoJSON type definitions
│   │   ├── geojson.json       # Country GeoJSON data
│   │   ├── utils.ts           # Helper utilities
│   │   └── webglutils.ts      # WebGL helper functions
│   ├── main.ts                # WebGL initialization & rendering logic
│   └── style.css              # Global styles
├── index.html
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## 🛠️ Project Setup & Run Commands

### 1️⃣ Install dependencies

```bash
npm install

2️⃣ Start development server
npm run dev


Vite will start a local dev server (usually at http://localhost:5173
).

3️⃣ Build for production
npm run build

4️⃣ Preview production build
npm run preview
```
