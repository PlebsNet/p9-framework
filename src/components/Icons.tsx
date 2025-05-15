import { memo, forwardRef, SVGProps } from 'react';
import { IconBase } from '@/components/ui/IconBase';

type IconProps = SVGProps<SVGSVGElement>;

export function Logomark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

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

export const User = memo(forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </IconBase>
)));

export const More = memo(forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </IconBase>
)));

export const Brain = memo(forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-5 0v-15A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 5 0v-15A2.5 2.5 0 0 0 14.5 2Z" />
  </IconBase>
)));

export const Menu = memo(forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </IconBase>
)));

export const X = memo(forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </IconBase>
)));

export const Triples = memo(forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </IconBase>
)));

