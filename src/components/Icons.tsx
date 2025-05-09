import { memo, forwardRef, SVGProps } from 'react';
import { IconBase } from '@/components/ui/IconBase';

export function Logomark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="logomark darkmode"
      width="100%"
      height="100%"
      viewBox="0 0 189 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="false"
      aria-label="Plebs logo"
      {...props}
    >
      <g stroke="#fff" strokeWidth="12" strokeLinejoin="round">
        <path d="M115.446 94.3634V251H5V94.3634C5 45.0429 45.0416 5 94.3621 5C143.683 5 183.726 45.0429 183.726 94.3634V182.72H73.2796V94.3634C73.2796 82.7266 82.7266 73.2796 94.3621 73.2796C105.999 73.2796 115.446 82.7266 115.446 94.3634Z"/>
        <path d="M149.585 94.3629V216.859H39.1392V94.3629C39.1392 63.8847 63.8834 39.1396 94.3617 39.1396C124.84 39.1396 149.585 63.8847 149.585 94.3629Z"/>
      </g>
    </svg>
  )
};

export const ChevronRight = memo(forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <IconBase ref={ref} aria-label="Chevron right icon" {...props}>
    <path d="m9 18 6-6-6-6" />
  </IconBase>
)));

export const Plus = memo(forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <IconBase ref={ref} aria-label="Plus icon" {...props}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </IconBase>
)));

export const User = memo(forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <IconBase ref={ref} aria-label="User icon" {...props}>
    <circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" />
  </IconBase>
)));

export const More = memo(forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <IconBase ref={ref} aria-label="More icon" {...props}>
    <rect rx="1.25" x="3" y="7" />
    <rect rx="1.25" x="3" y="15" />
  </IconBase>
)));


