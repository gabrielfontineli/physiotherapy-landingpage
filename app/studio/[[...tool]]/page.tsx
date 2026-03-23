export { metadata, viewport } from "next-sanity/studio"
export const dynamic = "force-dynamic"

import { StudioClient } from "./studio-client"

export default function StudioPage() {
  return <StudioClient />
}
