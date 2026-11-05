"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Github, X } from "lucide-react"
import data from "@/data/projects-data.json"

type Project = {
  title: string; description: string; technologies: string[]; category: string; year: string; status: string
  image: string; featured: boolean; company?: string; link?: string; technicalDetails?: string[]; impact?: string
}
const projects: Project[] = (data as any).engineer.projects

const split = (t: string) => { const [a, ...b] = t.split(" - "); return { main: a, sub: b.join(" - ") } }
const ref = (i: number) => `U${i + 1}`
const isPfe = (project: Project) => project.title.startsWith("Industrial Energy Monitoring Platform")

export function Work() {
  const [open, setOpen] = useState<number | null>(null)
  const [category, setCategory] = useState("All")
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRefs = useRef<Record<number, HTMLButtonElement | null>>({})

  const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))]
  const visibleProjects = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => category === "All" || project.category === category)

  useEffect(() => {
    if (open === null) return
    closeRef.current?.focus()
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null)
      if (e.key === "Tab") {
        const drawer = document.querySelector<HTMLElement>("[data-datasheet]")
        if (!drawer) return
        const focusable = drawer.querySelectorAll<HTMLElement>("a,button,[tabindex]:not([tabindex='-1'])")
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    addEventListener("keydown", k)
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden"
    return () => { removeEventListener("keydown", k); document.body.style.overflow = prev; triggerRefs.current[open]?.focus() }
  }, [open])

  const p = open === null ? null : projects[open]

  return (
    <section id="work" className="relative px-6 py-32 md:px-14">
      <div className="mx-auto max-w-[1500px]">
        <div className="sr mb-16 grid gap-8 border-b border-silk pb-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="silk">(02) Selected work</p>
            <h2 className="display mt-4 text-[clamp(2.6rem,7vw,6.5rem)]">The lab <span className="text-signal">bench</span></h2>
          </div>
          <p className="silk max-w-sm lg:text-right">{projects.length} projects, from RISC-V silicon and PCB layout to edge-AI firmware and cloud dashboards. Open any project for its datasheet.</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2" aria-label="Filter projects by category">
          {categories.map((item) => (
            <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item}
              className={`border px-3 py-2 font-mono text-[10px] uppercase tracking-[.12em] transition-colors ${category === item ? "border-signal bg-signal text-on-signal" : "border-border text-dim hover:border-signal hover:text-signal"}`}>
              {item}
            </button>
          ))}
          <span className="silk ml-auto self-center">Showing {visibleProjects.length} / {projects.length}</span>
        </div>

        <ul className="pb-[8vh]">
          {visibleProjects.map(({ project: pr, index: i }) => {
            const { main, sub } = split(pr.title)
            const flip = i % 2 === 1
            return (
              <li key={pr.title} className="md:sticky mb-[9vh] last:mb-0" style={{ top: `calc(5.5rem + ${i * 12}px)` }}>
                <article className="bracket overflow-hidden border border-border bg-sub-2 shadow-[0_-24px_60px_rgba(0,0,0,.3)]">
                  {/* silkscreen header strip */}
                  <div className="flex items-center justify-between gap-4 border-b border-border bg-sub px-5 py-3">
                    <span className="silk flex items-center gap-3"><span className="border border-gold/60 px-1.5 py-0.5 text-gold">{ref(i)}</span> {pr.category}</span>
                    <span className="silk hidden sm:block">Rev {pr.year} · {pr.company}</span>
                    <span className="silk flex items-center gap-2"><i className="led" /> {pr.status}</span>
                  </div>

                  <div className={`grid md:grid-cols-12 ${flip ? "" : ""}`}>
                    <button data-hot ref={(el) => { triggerRefs.current[i] = el }} onClick={() => setOpen(i)} aria-label={`Open datasheet: ${main}`}
                      className={`group relative block aspect-[16/10] overflow-hidden bg-sub md:col-span-6 md:aspect-auto md:min-h-[400px] ${flip ? "md:order-2" : ""}`}>
                      <Image src={pr.image} alt={main} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover saturate-[.85] transition duration-700 group-hover:scale-[1.04] group-hover:saturate-100" />
                      <div className="pour absolute inset-x-0 bottom-0 h-2 opacity-70" />
                      <span className="absolute bottom-5 left-5 flex items-center gap-2 bg-signal px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[.14em] text-on-signal opacity-0 transition-opacity group-hover:opacity-100">Open datasheet <ArrowUpRight className="h-3.5 w-3.5" /></span>
                    </button>

                    <div className="flex flex-col justify-between gap-8 p-6 md:col-span-6 md:p-10">
                      <div>
                        <p className="font-mono text-6xl font-semibold leading-none text-trace md:text-8xl">{String(i + 1).padStart(2, "0")}</p>
                        <h3 className="mt-6 text-[clamp(1.6rem,2.6vw,2.6rem)] font-semibold leading-[1.02] tracking-[-0.04em]">{main}</h3>
                        {sub && <p className="mt-2 text-dim">{sub}</p>}
                        <p className="mt-5 line-clamp-3 max-w-xl text-[15px] leading-relaxed text-dim">{pr.description}</p>
                        {pr.impact && <p className="mt-4 border-l-2 border-signal pl-3 font-mono text-xs uppercase tracking-[.08em] text-signal">Impact · {pr.impact}</p>}
                      </div>
                      <div>
                        <ul className="flex flex-wrap gap-2">
                          {pr.technologies.slice(0, 6).map((t) => <li key={t} className="pin !px-2.5 !py-1.5 !text-[11px]"><i className="pad !h-1.5 !w-1.5" /><span className="text-silk">{t}</span></li>)}
                        </ul>
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                          <button onClick={() => setOpen(i)} className="border border-silk/60 px-5 py-3 font-mono text-[11px] uppercase tracking-[.14em] transition-colors hover:border-signal hover:text-signal">Datasheet</button>
                          {pr.link && <a href={pr.link} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-2 py-3 font-mono text-[11px] uppercase tracking-[.14em] text-dim transition-colors hover:text-signal"><Github className="h-3.5 w-3.5" /> Source</a>}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>

      {/* datasheet drawer */}
      <div className={`fixed inset-0 z-[9000] transition-opacity duration-300 ${p ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={!p}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(null)} />
        <aside data-datasheet role="dialog" aria-modal="true" aria-label="Project datasheet"
          className={`absolute right-0 top-0 h-full w-full max-w-[720px] overflow-y-auto border-l border-border bg-sub-2 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${p ? "translate-x-0" : "translate-x-full"}`}>
          {p && open !== null && (
            <div>
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-sub/95 px-6 py-4 backdrop-blur">
                <span className="silk flex items-center gap-3"><span className="border border-gold/60 px-1.5 py-0.5 text-gold">{ref(open)}</span> Datasheet · Rev {p.year}</span>
                <button ref={closeRef} onClick={() => setOpen(null)} aria-label="Close datasheet" className="grid h-9 w-9 place-items-center border border-border hover:border-signal hover:text-signal"><X className="h-4 w-4" /></button>
              </div>
              <div className="relative aspect-[16/9] w-full bg-sub">
                <Image src={p.image} alt={p.title} fill sizes="720px" className="object-cover" />
              </div>
              <div className="space-y-10 p-6 md:p-10">
                <div>
                  <p className="silk">{p.category} · {p.company}</p>
                  <h3 className="mt-3 text-3xl font-semibold leading-[1.02] tracking-[-0.04em] md:text-4xl">{split(p.title).main}</h3>
                  {split(p.title).sub && <p className="mt-2 text-dim">{split(p.title).sub}</p>}
                </div>
                <section><h4 className="silk silk-o mb-3">01 · Description</h4><p className="leading-relaxed text-silk/85">{p.description}</p></section>
                {p.impact && <section><h4 className="silk silk-o mb-3">02 · Evidence / status</h4><p className="border-l-2 border-signal pl-4 font-mono text-sm uppercase tracking-[.08em] text-signal">{p.impact}</p></section>}
                {isPfe(p) && (
                  <div className="space-y-8 border-y border-border py-8">
                    <section>
                      <h4 className="silk silk-o mb-3">03 · Engineering case study</h4>
                      <p className="leading-relaxed text-silk/85">The PFE connected four related workstreams: an energy-monitoring workspace, an interpretable machine-state detection pipeline, an M-Bus meter-reader prototype, and an end-of-line testing application. The work is presented at prototype and demonstrator level; production hardware and firmware are confidential and excluded.</p>
                    </section>
                    <section>
                      <h4 className="silk silk-o mb-3">04 · Detection pipeline</h4>
                      <ol className="space-y-2 font-mono text-xs leading-relaxed text-dim">
                        <li><span className="text-gold">01</span> Moving average to reduce short-term noise.</li>
                        <li><span className="text-gold">02</span> IQR filtering to reject outliers.</li>
                        <li><span className="text-gold">03</span> MAD-based gap scoring to separate operating regions.</li>
                        <li><span className="text-gold">04</span> Median filtering and transition persistence to avoid unstable state changes.</li>
                        <li><span className="text-gold">05</span> State classification and idle-energy / cost estimation using per-asset thresholds.</li>
                      </ol>
                    </section>
                    <section className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <h4 className="silk silk-o mb-3">05 · Hardware flow</h4>
                        <p className="text-sm leading-relaxed text-silk/85">nRF52832 prototype → M-Bus master → Hydrus meter discovery and polling → data decoding → flash persistence. The supply prototype used a TPS55340 boost stage with TX voltage modulation and RX current sensing.</p>
                      </div>
                      <div>
                        <h4 className="silk silk-o mb-3">06 · Test workflow</h4>
                        <p className="text-sm leading-relaxed text-silk/85">A modular Python / PySide6 application coordinates worker objects with QThread, Nordic PPK2 current profiling, SEGGER J-Link flashing, serial diagnostics, boot-version reading, QR-code workflows and run-specific failure logs.</p>
                      </div>
                    </section>
                    <section>
                      <h4 className="silk silk-o mb-3">07 · Limitations</h4>
                      <p className="text-sm leading-relaxed text-dim">Threshold behavior depends on the monitored asset and input data. The method is not presented with an accuracy claim or formal qualification result. The tester is not described as fully asynchronous or production-hardened, and confidential production artifacts are not published.</p>
                    </section>
                  </div>
                )}
                {p.technicalDetails && (
                  <section>
                    <h4 className="silk silk-o mb-3">{isPfe(p) ? "08" : "03"} · Implementation details</h4>
                    <ol className="border-t border-border">
                      {p.technicalDetails.map((d, k) => (
                        <li key={k} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-border py-3 text-[15px]"><span className="font-mono text-gold">{String(k + 1).padStart(2, "0")}</span><span className="text-silk/85">{d}</span></li>
                      ))}
                    </ol>
                  </section>
                )}
                <section>
                  <h4 className="silk silk-o mb-3">{isPfe(p) ? "09" : "04"} · Stack</h4>
                  <ul className="flex flex-wrap gap-2">{p.technologies.map((t) => <li key={t} className="pin"><i className="pad" /><span className="text-silk">{t}</span></li>)}</ul>
                </section>
                {p.link && <a href={p.link} target="_blank" rel="noopener" className="inline-flex items-center gap-2 bg-signal px-6 py-4 font-mono text-xs font-semibold uppercase tracking-[.14em] text-on-signal"><Github className="h-4 w-4" /> View source <ArrowUpRight className="h-4 w-4" /></a>}
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}
