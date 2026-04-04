# Style — Theme, Design Tokens, Animation

> Source of truth: `src/app/globals.css`

---

## Color Tokens (Semantic)

| Token | ใช้กับ | Light | Dark |
|-------|--------|-------|------|
| `background` | พื้นหลัง body/page | white | oklch(0.145) |
| `foreground` | text หลัก | oklch(0.145) | oklch(0.985) |
| `card` / `card-foreground` | Card component | white / dark | oklch(0.205) / light |
| `popover` / `popover-foreground` | Popover/Dropdown | white / dark | oklch(0.205) / light |
| `primary` / `primary-foreground` | CTA, buttons หลัก | dark / white | light / dark |
| `secondary` / `secondary-foreground` | ปุ่มรอง | oklch(0.97) / dark | oklch(0.269) / light |
| `muted` / `muted-foreground` | พื้นหลังรอง, text อ่อน | oklch(0.97) / oklch(0.556) | oklch(0.269) / oklch(0.708) |
| `accent` / `accent-foreground` | Hover, active state | oklch(0.97) / dark | oklch(0.269) / light |
| `destructive` | Error, delete | oklch(0.577) red | oklch(0.704) red |
| `border` | เส้นขอบ | oklch(0.922) | white 10% |
| `input` | Form input border | oklch(0.922) | white 15% |
| `ring` | Focus ring | oklch(0.708) | oklch(0.556) |

---

## Sidebar Tokens

| Token | Light | Dark |
|-------|-------|------|
| `sidebar` | oklch(0.985) | oklch(0.205) |
| `sidebar-foreground` | oklch(0.145) | oklch(0.985) |
| `sidebar-primary` | oklch(0.205) | oklch(0.488) blue |
| `sidebar-primary-foreground` | oklch(0.985) | oklch(0.985) |
| `sidebar-accent` | oklch(0.97) | oklch(0.269) |
| `sidebar-accent-foreground` | oklch(0.205) | oklch(0.985) |
| `sidebar-border` | oklch(0.922) | white 10% |
| `sidebar-ring` | oklch(0.708) | oklch(0.556) |

---

## Brand Token

| Token | Light | Dark |
|-------|-------|------|
| `brand-100` | oklch(84.678% 0.20046 128.108) green | oklch(49.171% 0.12749 129.403) green |

---

## Chart Tokens

| Token | Value |
|-------|-------|
| `chart-1` | oklch(0.87) |
| `chart-2` | oklch(0.556) |
| `chart-3` | oklch(0.439) |
| `chart-4` | oklch(0.371) |
| `chart-5` | oklch(0.269) |

---

## Radius

| Variant | Value |
|---------|-------|
| Base `--radius` | 0.625rem |
| `radius-sm` | base * 0.6 |
| `radius-md` | base * 0.8 |
| `radius-lg` | base (0.625rem) |
| `radius-xl` | base * 1.4 |
| `radius-2xl` | base * 1.8 |
| `radius-3xl` | base * 2.2 |
| `radius-4xl` | base * 2.6 |

---

## Fonts

| Role | Font | CSS Variable |
|------|------|-------------|
| Sans (body) | Geist Sans | `--font-geist-sans` |
| Mono (code) | Geist Mono | `--font-geist-mono` |
| Heading | = Sans | `--font-sans` |

---

## Animation Rules

| Property | Value |
|----------|-------|
| Duration | 0.4 - 0.8s (ห้ามเกิน 1s) |
| Ease | `easeOut` (default) |
| Scroll trigger | `whileInView` + `once: true` |
| Stagger gap | 0.06s ระหว่าง children |
| Stagger delay | 0.15s ก่อนเริ่ม |
| Hover scale | 1.02 (cards) |

### Rules
- Motion presets อยู่ใน `src/lib/framer-motion/` เท่านั้น — ห้ามสร้างใน component
- ห้าม animation บน above-the-fold hero ที่ทำให้ user รอนาน
- ห้าม motion ที่ distract จาก content

---

## Theme Strategy

- **Dark mode**: class strategy via `next-themes` (attribute="class")
- **Semantic tokens ONLY** — ห้าม hardcode สี (`bg-red-500`, `#C40C0C`, `bg-[#xxx]`)
- **Custom variant**: `@custom-variant dark (&:is(.dark *))`
- เปลี่ยน token ที่ `globals.css` → เปลี่ยนทั้ง project
