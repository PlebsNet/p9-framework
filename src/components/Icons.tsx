import { memo, forwardRef, SVGProps } from 'react';
import { IconBase } from '@/components/ui/IconBase';
import { cn } from '@/lib/utils';

export function Logomark({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={cn("logomark darkmode", className)}
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
    <line x1="4" x2="20" y1="9" y2="9" />
    <line x1="4" x2="14" y1="16" y2="16" />
  </IconBase>
)));

export const Brain = memo(forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <IconBase ref={ref} aria-label="Brain icon" {...props}>
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
    <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
    <path d="M6 18a4 4 0 0 1-1.967-.516" />
    <path d="M19.967 17.484A4 4 0 0 1 18 18" />
  </IconBase>
)));

export const Dot = memo(forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <IconBase ref={ref} aria-label="Dot icon" {...props}>
    <circle cx="12.1" cy="12.1" r="1" />
  </IconBase>
)));

export const Cross = memo(forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <IconBase ref={ref} aria-label="Cross icon" {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </IconBase>
)));
