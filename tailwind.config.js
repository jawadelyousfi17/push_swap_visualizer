/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        frame: "var(--frame)",
        sunk: "var(--sunk)",
        base: "var(--base)",
        raised: "var(--raised)",
        "raised-2": "var(--raised-2)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        ok: "var(--ok)",
        bad: "var(--bad)",
        accent: "var(--accent)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Roboto", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
}
