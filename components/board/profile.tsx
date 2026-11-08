"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import data from "@/data/projects-data.json"

gsap.registerPlugin(ScrollTrigger)

const eng = (data as any).engineer
const banks: { title: string; items: string[] }[] = [
  { title: "Programming", items: ["Python", "C++20", "C", "JavaScript", "C#", "Java", "SQL", "Solidity"] },
  { title: "AI & GenAI", items: ["RAG", "LLMs", "PyTorch", "TensorFlow", "LangChain", "LlamaIndex", "ONNX", "OpenCV"] },
  { title: "Cybersecurity", items: ["ModSecurity", "Zeek", "Suricata", "MITRE ATT&CK", "SIEM", "Pentesting", "Secure RAG", "CTF"] },
  { title: "Cloud & DevSecOps", items: ["AWS", "Docker", "Kubernetes", "OpenSearch", "Trivy", "Falco", "OPA", "Grafana"] },
  { title: "Networks & systems", items: ["TCP/IP", "Routing", "Linux", "SDN", "IP/MPLS", "NetEm", "TBF", "MQTT"] },
  { title: "Engineering", items: ["CMake", "Eigen", "NumPy", "SciPy", "Streamlit", "PostgreSQL", "MongoDB", "Git"] },
  { title: "Enterprise & agents", items: ["MCP", "AutoGen", "CrewAI", "SAP Clean Core", "ABAP RAP", "CDS Views", "OData", "Fiori"] },
]
const pinCount = banks.reduce((a, b) => a + b.items.length, 0)
const projectCount = eng.projects.length

const statement = "I build AI-assisted security systems, cloud-native infrastructure and reproducible engineering tools across cybersecurity, networked systems and reliable automation, with hands-on experience in C++ and applied AI."

const education = [
  { addr: "0x2027", name: "National Engineering Degree in ICT", org: "ENIT · Telecommunications & Networks · I3C", span: "2024 – 2027", status: "Final year · In progress", logo: true },
  { addr: "0x2027", name: "IST Master's Programme", org: "Concurrent programme · Information Systems and Technology", span: "2026 – 2027", status: "Final year · In progress", logo: false },
  { addr: "0x2024", name: "Preparatory Programme in Physics & Chemistry", org: "IPEIM · National rank 133 / 1750", span: "2022 – 2024", status: "" },
  { addr: "0x2021", name: "Tunisian Baccalaureate, Experimental Sciences", org: "17.53 / 20 · First Class Honours", span: "2021", status: "" },
]
const internships = [
  { when: "2026", role: "AI & Enterprise Software Intern", org: "AYMAX · Tunis", note: "VS Code multi-agent assistant for SAP modernization", tag: "Agentic AI", image: "/internships/aymax.jpg" },
  { when: "2025–26", role: "AI & Cybersecurity Intern", org: "Sopra Steria · Tunis", note: "NovaGuard AI for WAF monitoring and RAG", tag: "Security AI", image: "/internships/sopra-steria.jpg" },
  { when: "2025", role: "Digital Transformation Intern", org: "SORECI · Tunis", note: "Network, systems and AWS cloud migration", tag: "", image: "/internships/soreci.jpg" },
  { when: "2025", role: "Web Developer & AI Tools Engineer", org: "Louati Construction · Remote", note: "Real-time project tracking and risk analysis", tag: "", image: "/internships/louati-construction.jpg" },
  { when: "2024–now", role: "Web Developer", org: "ENIT Junior Enterprise · Tunis", note: "Next.js websites, tools, backend logic and APIs", tag: "", image: "" },
]
const languages = [
  { name: "Arabic", level: "Native" },
  { name: "French", level: "C1 · Advanced" },
  { name: "English", level: "C1 · Advanced" },
  { name: "German", level: "A2 · Basic" },
]
const leadership = [
  { when: "2×", org: "Tunisian National Taekwondo", role: "Champion · Former national-team member" },
  { when: "2025–now", org: "Securinets Club", role: "CTF organization and security training" },
  { when: "2024–now", org: "ENIT", role: "Linux and exploit-development activities" },
]

const modules = [
  { id: "core", ref: "U1", label: "CORE", sub: "Who I am", diag: ["OA-2026", "@ 100 MHz"] },
  { id: "io", ref: "U2", label: "I/O", sub: "Core technical skills", diag: [`${banks.length} banks`, `${pinCount} pins`] },
  { id: "mem", ref: "U3", label: "MEMORY", sub: "Academic background", diag: ["0x2027 ENIT", "✓ in progress"] },
  { id: "log", ref: "U4", label: "LOG", sub: "Internships", diag: [`${internships.length} internships`, "boot: OK"] },
  { id: "aux", ref: "U5", label: "AUX", sub: "Leadership & languages", diag: [`${leadership.length} roles`, `${languages.length} langs`] },
]

/* ── the diagram ─────────────────────────────── */
const Y = [60, 155, 250, 345, 440] // block centre-y in viewBox
function Diagram({ active }: { active: number }) {
  return (
    <svg viewBox="0 0 390 500" className="h-full w-full" role="img" aria-label="Block diagram of Louay's profile: core, I/O, memory, internship log and aux connected by a bus">
      {/* bus */}
      <line x1="195" y1="16" x2="195" y2="484" stroke="var(--trace)" strokeWidth="6" />
      <line x1="195" y1="16" x2="195" y2="484" stroke="var(--gold)" strokeOpacity=".35" strokeWidth="1" strokeDasharray="2 8" />
      <text x="195" y="498" textAnchor="middle" className="fill-dim" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1.5">AXI4-Lite BUS</text>
      {/* travelling token */}
      <g style={{ transform: `translateY(${Y[active]}px)`, transition: "transform .8s cubic-bezier(.7,0,.2,1)" }}>
        <circle cx="195" cy="0" r="13" fill="var(--signal)" fillOpacity=".18" />
        <circle cx="195" cy="0" r="4.5" fill="var(--signal)" />
      </g>
      {modules.map((m, i) => {
        const left = i % 2 === 0
        const on = i === active
        const x = left ? 8 : 232, w = 150
        const cx1 = left ? x + w : x, cx2 = 195
        return (
          <g key={m.id}>
            <line x1={cx1} y1={Y[i]} x2={cx2} y2={Y[i]} stroke={on ? "var(--signal)" : "var(--trace)"} strokeWidth={on ? 2 : 3} className={on ? "flow" : ""} />
            <circle cx={cx2} cy={Y[i]} r="3.5" fill="var(--sub)" stroke={on ? "var(--signal)" : "var(--gold)"} strokeOpacity={on ? 1 : .6} />
            <rect x={x} y={Y[i] - 38} width={w} height="76" stroke={on ? "var(--signal)" : "var(--border)"} style={{ fill: on ? "color-mix(in srgb,var(--signal) 10%,var(--sub))" : "var(--sub-2)", transition: "all .4s" }} />
            {/* pins */}
            {Array.from({ length: 5 }).map((_, k) => (
              <rect key={k} x={left ? x - 5 : x + w} y={Y[i] - 30 + k * 15} width="5" height="6" fill="var(--gold)" opacity={on ? 1 : .45} />
            ))}
            <text x={x + 12} y={Y[i] - 21} fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1.5" className="fill-dim">{m.ref}</text>
            <text x={x + 12} y={Y[i] - 2} fontSize="17" fontWeight="600" fontFamily="var(--font-mono)" letterSpacing="1" fill={on ? "var(--signal)" : "var(--silk)"} style={{ transition: "fill .4s" }}>{m.label}</text>
            <text x={x + 12} y={Y[i] + 14} fontSize="8.5" fontFamily="var(--font-mono)" className="fill-dim">{m.diag[0]}</text>
            <text x={x + 12} y={Y[i] + 27} fontSize="8.5" fontFamily="var(--font-mono)" className="fill-dim">{m.diag[1]}</text>
          </g>
        )
      })}
    </svg>
  )
}

const Head = ({ i }: { i: number }) => (
  <div className="mb-8 flex items-center gap-4">
    <span className="border border-gold/60 px-2 py-1 font-mono text-[11px] text-gold">{modules[i].ref}</span>
    <span className="silk silk-w">{modules[i].label}</span>
    <span className="h-px flex-1 bg-border" />
    <span className="silk">{modules[i].sub}</span>
  </div>
)

export function Profile() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])
  const words = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-42% 0px -42% 0px" })
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const w = words.current?.querySelectorAll("span")
    if (!w) return
    const tw = gsap.fromTo(w, { opacity: 0.14 }, { opacity: 1, stagger: 0.1, ease: "none",
      scrollTrigger: { trigger: words.current, start: "top 82%", end: "bottom 50%", scrub: true } })
    return () => { tw.scrollTrigger?.kill(); tw.kill() }
  }, [])

  const reg = (i: number) => ({ ref: (el: HTMLElement | null) => { refs.current[i] = el }, "data-i": i })

  return (
    <section id="profile" className="relative px-6 py-32 md:px-14">
      <div className="mx-auto max-w-[1500px]">
        <div className="sr mb-20 flex items-end justify-between border-b border-silk pb-5">
          <div>
            <p className="silk">(01) Profile</p>
            <h2 className="display mt-4 text-[clamp(2.6rem,7vw,6.5rem)]">System <span className="text-signal">overview</span></h2>
          </div>
          <p className="silk hidden max-w-[16rem] text-right md:block">One chip. Five subsystems.<br />Scroll to route the bus.</p>
        </div>

        <div className="grid gap-16 lg:grid-cols-[390px_1fr] lg:gap-24">
          {/* sticky diagram */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 h-[min(72vh,620px)] w-[390px]">
              <Diagram active={active} />
            </div>
          </aside>

          <div className="min-w-0 space-y-24 lg:space-y-56">
            {/* U1 — CORE */}
            <article id="profile" {...reg(0)}>
              <Head i={0} />
              <p ref={words} className="text-[clamp(1.9rem,3.9vw,3.8rem)] font-medium leading-[1.06] tracking-[-0.04em]">
                {statement.split(" ").map((w, i) => <span key={i}>{w} </span>)}
              </p>
              <dl className="mt-14 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
                {[["DEGREE", "B.Eng · EE"], ["BAC", "17.43 / 20"], ["PROJECTS", String(projectCount)], ["INTERNSHIPS", String(internships.length)]].map(([k, v]) => (
                  <div key={k} className="bg-sub p-5">
                    <dt className="silk">{k}</dt>
                    <dd className="mt-2 font-mono text-xl text-silk md:text-2xl">{v}</dd>
                  </div>
                ))}
              </dl>
            </article>

            {/* U2 — I/O : skills */}
            <article id="skills" {...reg(1)}>
              <Head i={1} />
              <div className="space-y-12">
                {banks.map((b, bi) => (
                  <div key={b.title} className="sr" style={{ ["--d" as any]: `${bi * 0.08}s` }}>
                    <div className="flex items-baseline gap-4">
                      <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{b.title}</h3>
                      <span className="silk">BANK {String.fromCharCode(65 + bi)} · {b.items.length} pins</span>
                    </div>
                    <ul className="mt-5 flex flex-wrap gap-2.5">
                      {b.items.map((it, k) => (
                        <li key={it} className="pin"><i className="pad" /><span className="text-dim">P{String.fromCharCode(65 + bi)}{k}</span><span className="text-silk">{it}</span></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>

            {/* U3 — MEMORY : education */}
            <article id="education" {...reg(2)}>
              <Head i={2} />
              <div className="border-y border-silk">
                <div className="hidden grid-cols-[6rem_1fr_9rem] gap-6 border-b border-border py-3 md:grid">
                  <span className="silk">Addr</span><span className="silk">Region</span><span className="silk text-right">Span</span>
                </div>
                {education.map((e, i) => (
                  <div key={`${e.addr}-${i}`} className="sr grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 gap-y-1 border-b border-border py-7 last:border-b-0 md:grid-cols-[6rem_minmax(0,1fr)_9rem] md:gap-x-6" style={{ ["--d" as any]: `${i * 0.08}s` }}>
                    <span className="font-mono text-sm text-gold">{e.addr}</span>
                    <div className="flex min-w-0 items-start gap-3 sm:gap-5">
                      {e.logo ? <Image src="/enit.png" alt="ENIT" width={64} height={64} className="hidden h-14 w-14 shrink-0 object-contain sm:block" /> : <span aria-hidden className="hidden h-14 w-14 shrink-0 sm:block" />}
                      <div className="min-w-0">
                        <p className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.75rem]">{e.name}</p>
                        <p className="mt-1 text-sm text-dim">{e.org}</p>
                      </div>
                    </div>
                    <div className="col-start-2 md:col-start-auto md:text-right">
                      <p className="font-mono text-sm text-silk">{e.span}</p>
                      {e.status && <p className="silk mt-1 inline-flex items-center gap-2"><i className="led" /> {e.status}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* U4 — LOG : internships */}
            <article id="experience" {...reg(3)}>
              <Head i={3} />
              <ul className="space-y-5">
                {internships.map((x, i) => (
                  <li key={x.org} className="sr bracket grid overflow-hidden border border-border bg-sub-2 md:grid-cols-[14rem_1fr]" style={{ ["--d" as any]: `${i * 0.08}s` }}>
                    <div className="relative h-40 overflow-hidden bg-sub md:h-auto md:min-h-[8.5rem]">
                      {x.image ? (
                        <Image src={x.image} alt={`${x.org} internship visual`} fill sizes="(min-width: 768px) 224px, 100vw" quality={90} className="object-cover transition duration-500 hover:scale-105" />
                      ) : (
                        <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_50%_30%,rgba(0,255,157,.16),transparent_55%)] font-mono text-[10px] uppercase tracking-[.2em] text-dim">ENIT · WEB SYSTEMS</div>
                      )}
                    </div>
                    <div className="flex flex-col justify-between gap-5 p-6 md:p-7">
                      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                        <span className="silk flex items-center gap-2"><i className="led" /> {x.tag || "Completed"}</span>
                        <span className="font-mono text-sm text-gold">{x.when}</span>
                      </div>
                      <div>
                        <p className="text-2xl font-semibold leading-tight tracking-tight md:text-[1.75rem]">{x.org}</p>
                        <p className="mt-1 text-silk/85">{x.role}</p>
                        {x.note && <p className="mt-3 text-sm text-dim">{x.note}</p>}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </article>

            {/* U5 — AUX : leadership & languages */}
            <article {...reg(4)}>
              <Head i={4} />
              <div className="border border-border bg-sub-2/70 p-6 font-mono text-[13px] leading-7 md:p-9 md:text-[15px] md:leading-8">
                <p className="sr text-dim">{"// leadership & extracurricular"}</p>
                {leadership.map((l) => (
                  <p key={l.org} className="sr">
                    <span className="text-dim">[ {l.when} ]</span> <span className="text-led">OK</span>{" "}
                    <span className="text-silk">{l.org}</span> <span className="text-dim">—</span> {l.role}
                  </p>
                ))}

                <p className="sr mt-6 text-dim">{"// languages"}</p>
                <p className="sr flex flex-wrap gap-x-6">
                  {languages.map((l) => (
                    <span key={l.name}>
                      <span className="text-silk">{l.name}</span> <span className="text-dim">=</span> <span className="text-signal">{l.level.split(" ")[0]}</span>
                    </span>
                  ))}
                </p>

                <p className="sr mt-6"><span className="text-dim">[ NOW  ]</span> <span className="text-signal">..</span> <span className="caret text-silk">Final-year dual-program student, seeking an internship</span></p>
              </div>
            </article>

          </div>
        </div>
      </div>
    </section>
  )
}