import type { NextConfig } from "next";
import fs from "fs";
import path from "path";
import https from "https";

// Auto-download planet textures to public folder for lightning-fast local caching
const textures = {
  "earth_atmos.jpg": "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
  "earth_normal.jpg": "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
  "earth_spec.jpg": "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
  "earth_clouds.png": "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
  "moon.jpg": "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg"
};

const planetsDir = path.join(process.cwd(), "public", "planets");
if (!fs.existsSync(planetsDir)) {
  fs.mkdirSync(planetsDir, { recursive: true });
}

Object.entries(textures).forEach(([filename, url]) => {
  const dest = path.join(planetsDir, filename);
  if (!fs.existsSync(dest)) {
    console.log(`[WebGL Optimization] Downloading texture: ${filename}...`);
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`[WebGL Optimization] Saved ${filename} locally.`);
      });
    }).on("error", (err) => {
      fs.unlink(dest, () => {});
      console.error(`[WebGL Optimization] Error downloading ${filename}:`, err.message);
    });
  }
});

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    "*.replit.dev",
    "*.repl.co",
    "*.pike.replit.dev",
  ],
};

export default nextConfig;
