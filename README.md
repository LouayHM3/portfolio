# Omar Alibi — Engineering Portfolio

Personal portfolio for Omar Alibi, an Electrical Engineering graduate focused on embedded systems, firmware, electronics prototyping, software tooling, and industrial IoT.

Live site: [omaralibi.tn](https://omaralibi.tn)  
GitHub: [github.com/alibiomar](https://github.com/alibiomar)

## What this site communicates

The portfolio is designed as an evidence-first engineering profile rather than a generic project gallery. It presents:

- Embedded firmware and electronics projects
- Industrial IoT and energy-monitoring work
- Edge-AI and computer-vision experiments
- FPGA and RISC-V designs
- Software, test, and diagnostic tooling
- Education, internships, technical skills, CV downloads, and contact information

Project descriptions distinguish between implemented work, prototypes, demonstrated functionality, confidential production artifacts, and future improvements.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Geist Sans and Geist Mono
- GSAP and Intersection Observer for motion
- `next/image` for optimized project imagery
- Nodemailer-backed contact API
- Zod validation and server-side rate limiting
- `next-sitemap` for sitemap generation

## Project structure

```text
app/
  layout.tsx              Metadata, structured data, global layout
  page.tsx                Portfolio page composition
  globals.css             Design tokens, themes, components, motion
  api/contact/route.ts    Contact form endpoint

components/
  board/                  Main portfolio sections and board-style UI
  ui/                     Reusable Radix-based UI components

data/
  projects-data.json      Project, skill, academic, and freelance content

lib/
  rate-limit.ts           Contact endpoint rate limiting
  theme-colors.ts         Theme utilities
  utils.ts                Shared utilities

public/
  projects/               Project images
  logos/                  Organization logos
  *.pdf                   Downloadable CV and resume files
```

## Main sections

### Hero

Introduces Omar as an engineer working across embedded systems, firmware, hardware prototypes, and industrial IoT. It includes links to selected work, CV downloads, GitHub, LinkedIn, and email.

### Profile

Provides:

- Engineering profile and education
- Categorized technical skills
- Internship and experience history
- Leadership and language information

### Selected work

Projects are filterable by category and open in an accessible datasheet drawer. Each project can include:

- Context and overview
- Technologies
- Implementation details
- Evidence or demonstrated functionality
- Source repository links
- Limitations and scope notes

The final-year project includes additional case-study material covering ThingsBoard dashboards, machine-state detection, M-Bus hardware and firmware prototyping, and the PySide6 end-of-line tester.

### Contact

The contact form validates input in the browser and submits to `/api/contact`. Email delivery requires the server-side environment variables described below.

## Local development

### Requirements

- Node.js compatible with the installed Next.js version
- pnpm 10+

### Install dependencies

```bash
pnpm install
```

### Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
pnpm build
pnpm start
```

The build also generates the sitemap through the `postbuild` script.

## Available scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Start the Next.js development server |
| `pnpm build` | Create an optimized production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Legacy lint command; currently incompatible with Next.js 16 because `next lint` has been removed |
| `pnpm postbuild` | Generate sitemap files |

Type-check the project directly with:

```bash
pnpm exec tsc --noEmit
```

## Contact configuration

The contact route uses Nodemailer and expects server-side environment variables. Do not commit credentials.

```text
GMAIL_USER=your-address@example.com
GMAIL_APP_PASSWORD=your-app-password
```

Use a provider-specific app password rather than a normal mailbox password. The contact route also applies validation, honeypot handling, and rate limiting.

## Content and evidence policy

Content is maintained in [`data/projects-data.json`](./data/projects-data.json). When adding or editing a project:

1. Describe the problem and the actual contribution.
2. Link to a public repository or supporting asset when available.
3. Separate implemented, prototyped, tested, planned, and confidential work.
4. Avoid unsupported accuracy, performance, user, customer, production, or deployment claims.
5. Preserve technical distinctions such as AXI4 versus AXI4-Lite and single-cycle versus multi-cycle designs.

The industrial energy-monitoring final-year project is presented at prototype and demonstrator level. Confidential production hardware and firmware are intentionally not published.

## Accessibility and responsive behavior

- Semantic sections and navigation landmarks
- Keyboard-accessible project drawer with Escape handling and focus restoration
- Visible `:focus-visible` states
- Reduced-motion support for interactive effects
- Responsive layouts for mobile, tablet, and desktop
- Optimized responsive images through Next.js

## Validation

Before submitting changes, run:

```bash
pnpm exec tsc --noEmit
pnpm build
git diff --check
```

The existing `pnpm lint` script is retained for compatibility with the repository history, but requires migration to a standalone ESLint command for current Next.js versions.
