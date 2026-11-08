"use client"

import Image from "next/image"
import { useRef, useState, type PointerEvent } from "react"

export function PhotoBadge() {
  const [flipped, setFlipped] = useState(false)
  const hanger = useRef<HTMLDivElement>(null)
  const drag = useRef({ x: 0, y: 0, moved: false })

  const pull = (event: PointerEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
    const x = Math.max(-65, Math.min(65, event.clientX - drag.current.x))
    const y = Math.max(-20, Math.min(80, event.clientY - drag.current.y))
    if (Math.abs(x) + Math.abs(y) > 6) drag.current.moved = true
    hanger.current?.style.setProperty("--pull-x", `${x}px`)
    hanger.current?.style.setProperty("--pull-y", `${y}px`)
    hanger.current?.style.setProperty("--pull-angle", `${x / 5}deg`)
    const strapLength = window.matchMedia("(min-width:1024px)").matches ? 100 : 68
    hanger.current?.style.setProperty("--strap-length", `${Math.hypot(x, strapLength + y)}px`)
    hanger.current?.style.setProperty("--strap-angle", `${-Math.atan2(x, strapLength + y) * 180 / Math.PI}deg`)
  }

  const release = () => {
    hanger.current?.style.removeProperty("--pull-x")
    hanger.current?.style.removeProperty("--pull-y")
    hanger.current?.style.removeProperty("--pull-angle")
    hanger.current?.style.removeProperty("--strap-length")
    hanger.current?.style.removeProperty("--strap-angle")
    hanger.current?.removeAttribute("data-pulling")
  }

  return (
    <div ref={hanger} className="photo-badge-hanger">
      <div className="photo-badge-strap" aria-hidden="true" />
      <div className="photo-badge-pendant">
      <div className="photo-badge-clip" aria-hidden="true" />
      <button
        type="button"
        className="photo-badge-button"
        aria-label={flipped ? "Flip badge to show photo" : "Flip badge to show back"}
        aria-pressed={flipped}
        onClick={() => { if (!drag.current.moved) setFlipped((value) => !value) }}
        onPointerDown={(event) => {
          if (event.button !== 0) return
          drag.current = { x: event.clientX, y: event.clientY, moved: false }
          event.currentTarget.setPointerCapture(event.pointerId)
          hanger.current?.setAttribute("data-pulling", "true")
        }}
        onPointerMove={pull}
        onPointerUp={(event) => {
          release()
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
        }}
        onPointerCancel={release}
        onLostPointerCapture={release}
        onKeyDown={() => { drag.current.moved = false }}
      >
        <span className="photo-badge-rotator" data-flipped={flipped}>
          <span className="photo-badge photo-badge-front" aria-hidden={flipped}>
            <span className="photo-badge-slot" aria-hidden="true" />
            <span className="flex items-center justify-between border-b border-border pb-3 font-mono text-[9px] uppercase tracking-[.16em]">
              <span className="font-semibold text-silk">LH / ICT</span>
              <span className="text-signal">2026</span>
            </span>
            <span className="relative mt-4 block aspect-[4/4.3] overflow-hidden rounded-sm bg-white">
              <Image src="/profile.jpg" alt="Portrait of Louay Hammoudi" fill priority sizes="200px" draggable={false} className="object-cover object-top" />
            </span>
            <span className="block pt-4">
              <span className="block text-xl font-semibold leading-tight tracking-tight text-silk">Louay Hammoudi</span>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[.12em] text-dim">ICT</span>
              <span className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[.12em] text-dim"><i className="led" /> Student</span>
                <span className="photo-badge-barcode" aria-hidden="true" />
              </span>
            </span>
          </span>
          <span className="photo-badge photo-badge-back" aria-hidden={!flipped}>
            <span className="photo-badge-slot" aria-hidden="true" />
            <span className="font-mono text-[9px] uppercase tracking-[.16em] text-dim">LH / ICT</span>
            <span className="my-auto block text-center">
              <span className="block text-6xl font-semibold tracking-tighter text-signal">LH.</span>
              <span className="mt-4 block text-xl font-semibold text-silk">Louay Hammoudi</span>
              <span className="mt-2 block font-mono text-xs tracking-[.2em] text-dim">ICT</span>
            </span>
            <span className="flex items-center justify-between border-t border-border pt-3">
              <span className="font-mono text-[9px] text-dim">LH-2026</span>
              <span className="photo-badge-barcode" aria-hidden="true" />
            </span>
          </span>
        </span>
      </button>
      <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[.15em] text-dim">Tap to flip · Drag to pull</p>
      </div>
    </div>
  )
}
