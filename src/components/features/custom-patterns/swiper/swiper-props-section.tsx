import { CodeBlockShiki } from '@/components/tailwind/code-block-shiki';

const CAROUSEL_PROPS = [
  {
    group: 'Data (เลือก 1 ใน 3 mode)',
    props: [
      {
        name: 'slides',
        type: 'T[]',
        default: '—',
        desc: 'Array ข้อมูล slide — ถ้าไม่มี renderSlide จะ render <Image> อัตโนมัติ (T default = CarouselSlide)',
      },
      {
        name: 'renderSlide',
        type: '(item: T, index: number) => ReactNode',
        default: '—',
        desc: 'Custom render function — ใส่ Card, div, component อะไรก็ได้',
      },
      {
        name: 'children',
        type: 'ReactNode',
        default: '—',
        desc: 'Free-form mode — แต่ละ child element = 1 slide',
      },
    ],
  },
  {
    group: 'Effect',
    props: [
      {
        name: 'effect',
        type: "'slide' | 'fade' | 'coverflow'",
        default: "'slide'",
        desc: "Transition effect — 'slide' (default เลื่อน), 'fade' (จางหาย), 'coverflow' (3D perspective)",
      },
      {
        name: 'coverflowEffect',
        type: '{ rotate, stretch, depth, modifier, slideShadows }',
        default: '{ rotate: 20, depth: 250, ... }',
        desc: "Config สำหรับ coverflow — ใช้ได้เฉพาะเมื่อ effect='coverflow'",
      },
    ],
  },
  {
    group: 'Behavior',
    props: [
      {
        name: 'autoplay',
        type: 'boolean | { delay, disableOnInteraction }',
        default: 'false',
        desc: 'เปิด autoplay — true = delay 3000ms, หรือกำหนด { delay: 1800 } เอง',
      },
      {
        name: 'loop',
        type: 'boolean',
        default: 'false',
        desc: 'วน loop ไม่สิ้นสุด — slide สุดท้ายต่อ slide แรก',
      },
      {
        name: 'grabCursor',
        type: 'boolean',
        default: 'true',
        desc: 'เปลี่ยน cursor เป็น grab เมื่อ hover — บอก user ว่าลากได้',
      },
      {
        name: 'centeredSlides',
        type: 'boolean',
        default: 'false',
        desc: 'Active slide อยู่ตรงกลาง — ใช้คู่กับ slidesPerView > 1 หรือ "auto"',
      },
      {
        name: 'speed',
        type: 'number',
        default: '300',
        desc: 'ความเร็ว transition (ms)',
      },
    ],
  },
  {
    group: 'Layout',
    props: [
      {
        name: 'slidesPerView',
        type: "number | 'auto'",
        default: '1',
        desc: "จำนวน slide ที่เห็นพร้อมกัน — 'auto' = ขนาดตาม content, ต้องกำหนด width ใน slideClassName",
      },
      {
        name: 'spaceBetween',
        type: 'number',
        default: '0',
        desc: 'ช่องว่างระหว่าง slide (px)',
      },
      {
        name: 'breakpoints',
        type: "SwiperOptions['breakpoints']",
        default: '—',
        desc: 'Responsive config — เช่น { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }',
      },
    ],
  },
  {
    group: 'Modules',
    props: [
      {
        name: 'navigation',
        type: 'boolean',
        default: 'false',
        desc: 'แสดงลูกศร prev/next — auto import Navigation module',
      },
      {
        name: 'pagination',
        type: 'boolean',
        default: 'false',
        desc: 'แสดง dots ด้านล่าง (clickable) — auto import Pagination module',
      },
    ],
  },
  {
    group: 'Styling',
    props: [
      {
        name: 'className',
        type: 'string',
        default: '—',
        desc: 'Class สำหรับ Swiper container — กำหนด max-width, padding',
      },
      {
        name: 'slideClassName',
        type: 'string',
        default: '—',
        desc: 'Class สำหรับแต่ละ slide — กำหนดขนาด เช่น "aspect-video", "w-[280px] h-[200px]"',
      },
    ],
  },
  {
    group: 'Image (เฉพาะ default image mode)',
    props: [
      {
        name: 'imageSizes',
        type: 'string',
        default: "'(max-width: 768px) 100vw, 50vw'",
        desc: 'next/image sizes — บอก browser ว่ารูปจะใหญ่แค่ไหนในแต่ละ breakpoint',
      },
      {
        name: 'imagePriority',
        type: 'boolean',
        default: 'false',
        desc: 'Priority load สำหรับ slide แรก — ใช้เมื่อ carousel อยู่ above-the-fold',
      },
    ],
  },
] as const;

const THUMBNAIL_PROPS = [
  {
    name: 'slides',
    type: 'CarouselSlide[]',
    default: '(required)',
    desc: 'Array ของ { src, alt } สำหรับรูปภาพ',
  },
  {
    name: 'thumbsPerView',
    type: 'number',
    default: '4',
    desc: 'จำนวน thumbnail ที่เห็นพร้อมกัน',
  },
  {
    name: 'loop',
    type: 'boolean',
    default: 'false',
    desc: 'วน loop',
  },
  {
    name: 'className',
    type: 'string',
    default: '—',
    desc: 'Class สำหรับ container ทั้งหมด',
  },
  {
    name: 'thumbClassName',
    type: 'string',
    default: '—',
    desc: 'Class สำหรับ thumbnail swiper',
  },
  {
    name: 'imageSizes',
    type: 'string',
    default: "'(max-width: 768px) 100vw, 60vw'",
    desc: 'next/image sizes สำหรับรูปหลัก',
  },
] as const;

const SIZING_EXAMPLE = `{/* ❌ ไม่กำหนดขนาด — เต็มจอ */}
<SwiperCarousel slides={slides} navigation />

{/* ✅ กำหนด container width */}
<div className="mx-auto max-w-2xl">
  <SwiperCarousel slides={slides} navigation slideClassName="aspect-video" />
</div>

{/* ✅ slidesPerView="auto" — ต้องกำหนด width ใน slideClassName */}
<SwiperCarousel
  slides={slides}
  slidesPerView="auto"
  centeredSlides
  slideClassName="w-[280px] h-[200px] rounded-xl"
/>

{/* ✅ Responsive breakpoints */}
<SwiperCarousel
  slides={slides}
  slidesPerView={1}
  spaceBetween={16}
  breakpoints={{
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
  slideClassName="aspect-video"
/>`;

function PropsTable({
  props,
}: {
  props: readonly {
    readonly name: string;
    readonly type: string;
    readonly default: string;
    readonly desc: string;
  }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-150 text-left text-sm">
        <thead>
          <tr className="border-b text-muted-foreground">
            <th className="pb-2 pr-4 font-medium">Prop</th>
            <th className="pb-2 pr-4 font-medium">Type</th>
            <th className="pb-2 pr-4 font-medium">Default</th>
            <th className="pb-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b border-border/50">
              <td className="py-2 pr-4">
                <code className="rounded bg-muted px-1 py-0.5 text-xs font-semibold text-foreground">
                  {prop.name}
                </code>
              </td>
              <td className="py-2 pr-4">
                <code className="text-xs text-muted-foreground">
                  {prop.type}
                </code>
              </td>
              <td className="py-2 pr-4">
                <code className="text-xs text-muted-foreground">
                  {prop.default}
                </code>
              </td>
              <td className="py-2 text-muted-foreground">{prop.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SwiperPropsSection() {
  return (
    <section className="space-y-6 rounded-lg border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Props Reference
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          อธิบาย props ทุกตัว — กำหนดขนาด, behavior, effect ผ่าน props
        </p>
      </div>

      {/* Sizing Tips */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">
          Sizing Tips — วิธีควบคุมขนาด
        </h3>
        <p className="text-sm text-muted-foreground">
          Swiper ใช้ <strong>100% width ของ parent</strong> เสมอ —
          ต้องครอบ container กำหนด max-width หรือใช้ slideClassName กำหนดขนาด
          slide
        </p>
        <CodeBlockShiki code={SIZING_EXAMPLE} language="tsx" />
      </div>

      {/* SwiperCarousel Props */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">
          SwiperCarousel Props
        </h3>
        {CAROUSEL_PROPS.map((group) => (
          <div key={group.group} className="space-y-2">
            <h4 className="text-sm font-medium text-primary">
              {group.group}
            </h4>
            <PropsTable props={group.props} />
          </div>
        ))}
      </div>

      {/* ThumbnailGallery Props */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">
          SwiperThumbnailGallery Props
        </h3>
        <PropsTable props={THUMBNAIL_PROPS} />
      </div>
    </section>
  );
}
