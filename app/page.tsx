import { Hero } from "@/components/board/hero"
import { Profile } from "@/components/board/profile"
import { Work } from "@/components/board/work"
import { Contact } from "@/components/board/contact"
import { Rail } from "@/components/board/rail"
import { ScrollFX } from "@/components/board/scroll-fx"

export default function HomePage() {
  return (
    <main id="main" role="main">
      <Rail />
      <ScrollFX />
      <Hero />
      <Profile />
      <Work />
      <Contact />
    </main>
  )
}
