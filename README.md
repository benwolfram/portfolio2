# Mesh Gradient — React + Three.js

React app with Vite and Three.js via React Three Fiber. The scene loads a 3D model from a file.

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Loaded file

The scene loads **`/model.glb`** from the `public` folder. Put a GLB/GLTF file at:

```
public/model.glb
```

If the file is missing or fails to load, a fallback cube is shown. To use a different path, edit `MODEL_PATH` in `src/Scene.jsx`.

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages (free)

1. **Create a repo** on GitHub named `mesh-gradient` (or any name — if different, set `base` in `vite.config.js` to `'/your-repo-name/'`).

2. **Install and deploy:**
   ```bash
   npm install
   npm run deploy
   ```

3. **Turn on GitHub Pages:**  
   Repo → **Settings** → **Pages** → under "Build and deployment", set **Source** to **Deploy from a branch** → Branch: **gh-pages** → **Save**.

4. **Site URL:**  
   `https://<your-username>.github.io/mesh-gradient/` (or your repo name).

After that, run `npm run deploy` whenever you want to publish changes.

## Stack

- **React 18** + **Vite**
- **Three.js** via **@react-three/fiber**
- **@react-three/drei** for `useGLTF`, `OrbitControls`, `Environment`
