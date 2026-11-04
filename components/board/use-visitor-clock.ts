"use client"
import { useEffect, useState } from "react"

export type VisitorClock = {
  /** HH:MM:SS in the visitor's local time */
  time: string
}

const EMPTY: VisitorClock = { time: "--:--:--" }

export function useVisitorClock(): VisitorClock {
  const [state, setState] = useState<VisitorClock>(EMPTY)

  useEffect(() => {
    const clock = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    const tick = () => setState({ time: clock.format(new Date()) })

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return state
}
