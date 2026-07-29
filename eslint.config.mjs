import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  /**
   * THE MOTION WALL.
   *
   * The ~498 catalogue pages must ship 0 KB of animation JS. Scroll choreography
   * belongs only to the handful of narrative pages in app/(story)/.
   *
   * Without this guard the split regresses within two sprints — someone imports a
   * shared animated component into a product template and silently adds ~50 KB to
   * every product page. Pair with a build-output check asserting no gsap chunk
   * appears on catalogue routes.
   */
  {
    files: ["app/(catalog)/**/*.{ts,tsx}", "components/product/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "gsap", message: "Catalogue pages ship 0 KB animation JS. Use CSS animation-timeline: view() instead." },
            { name: "@gsap/react", message: "Catalogue pages ship 0 KB animation JS." },
            { name: "lenis", message: "Smooth scroll is hostile on a spec sheet. Story tier only." },
            { name: "lenis/react", message: "Smooth scroll is hostile on a spec sheet. Story tier only." },
            { name: "motion", message: "Catalogue pages ship 0 KB animation JS." },
            { name: "motion/react", message: "Catalogue pages ship 0 KB animation JS." },
            { name: "framer-motion", message: "Catalogue pages ship 0 KB animation JS." },
          ],
          patterns: [
            { group: ["gsap/*"], message: "Catalogue pages ship 0 KB animation JS." },
          ],
        },
      ],
    },
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
