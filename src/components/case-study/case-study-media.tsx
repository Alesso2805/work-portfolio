import Image from 'next/image';

/** One screen of a case study, already resolved for the page's locale. */
export interface MediaSlide {
  kind: 'image' | 'video';
  src: string;
  alt: string;
  caption?: { title: string; body: string };
}

/** The 16:9 box and, when the screen has one, the caption that explains it. */
export function MediaFigure({
  slide,
  className,
  roleDescription,
  label,
}: {
  slide: MediaSlide;
  className?: string;
  /** In a carousel: "slide", and its position as the label ("2 of 6"). */
  roleDescription?: string;
  label?: string;
}) {
  return (
    <figure className={className} aria-roledescription={roleDescription} aria-label={label}>
      <div className="relative aspect-video overflow-hidden border-2 border-rule">
        {slide.kind === 'video' ? (
          <video
            src={slide.src}
            aria-label={slide.alt}
            className="size-full object-cover"
            controls
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(max-width: 1280px) 100vw, 1184px"
            className="object-cover"
            // Dragging the carousel must move the screens, not lift the image out of the page.
            draggable={false}
          />
        )}
      </div>
      {slide.caption && (
        <figcaption className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
          <span className="flex-[1_1_320px] font-extrabold text-[22px] leading-[1.2]">
            {slide.caption.title}
          </span>
          <span className="flex-[2_1_480px] text-soft">{slide.caption.body}</span>
        </figcaption>
      )}
    </figure>
  );
}
