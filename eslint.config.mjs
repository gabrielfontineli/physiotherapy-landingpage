import next from "eslint-config-next"

const config = [
  ...next,
  { ignores: ["public/**", "styles/**"] },
  {
    rules: {
      // Padrão de guarda de hidratação (next-themes) + embla usam setState em
      // effect de propósito; idiomático, não é bug. Warn em vez de error.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]

export default config
