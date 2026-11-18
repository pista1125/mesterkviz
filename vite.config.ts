import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import os from "os";
import { componentTagger } from "lovable-tagger";

function getLocalNetworkIp(): string | null {
  try {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name] || []) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  } catch {
    // fallback
  }
  return null;
}

const devNetworkIp = getLocalNetworkIp();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    __DEV_NETWORK_IP__: JSON.stringify(devNetworkIp),
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        // Külső könyvtárak csoportosítása: a nagy, ritkán kellő részek (QR-olvasó, diagramok)
        // csak akkor töltődnek le, ha egy oldal tényleg használja őket; a többi jól gyorsítótárazható.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          // Mindenhol használt apró segédkönyvtárak az alapcsomagba – különben pl. a clsx a
          // diagram-csomagba kerülne (a recharts is használja), és az is előtöltődne.
          if (/node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|@remix-run|clsx|tailwind-merge|class-variance-authority)[\\/]/.test(id)) return "vendor-react";
          if (/node_modules[\\/](firebase|@firebase|re2js|idb)[\\/]/.test(id)) return "vendor-firebase";
          if (/node_modules[\\/]katex[\\/]/.test(id)) return "vendor-katex";
          if (/node_modules[\\/]html5-qrcode[\\/]/.test(id)) return "vendor-qr";
          if (/node_modules[\\/](recharts|recharts-scale|victory-vendor|d3-[^\\/]+|lodash|internmap|decimal\.js-light)[\\/]/.test(id)) return "vendor-charts";
          if (/node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) return "vendor-motion";
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
