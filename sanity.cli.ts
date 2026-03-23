import { defineCliConfig } from "sanity/cli"

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "s6p3t6yf",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  },
})
