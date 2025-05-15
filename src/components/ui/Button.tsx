import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group cursor-pointer inline-flex items-center justify-center gap-1 whitespace-nowrap leading-none font-medium touch-manipulation transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gray-100 text-gray-900 shadow hover:bg-gray-100/90 hover:text-gray-950",
        secondary:
          "bg-gray-800 text-gray-100 shadow-sm hover:bg-gray-800/80 hover:text-gray-50",
        positive:
          "bg-emerald-500 text-gray-50 shadow-sm hover:bg-emerald-500/90",
        destructive:
          "bg-rose-500 text-gray-50 shadow-sm hover:bg-rose-500/90",
        outline:
          "border border-gray-800 bg-transparent hover:shadow-sm hover:bg-gray-800/90 hover:text-gray-50",
        ghost:
          "hover:bg-gray-800/90 hover:text-gray-50",
        link:
          "text-[var(--color-brand-500)] hover:text-gray-50 underline-offset-4 hover:underline",
      },
      size: {
        xs: "px-1.5 py-0.25 rounded-md gap-1 text-xs",
        sm: "px-2.5 py-0.75 font-semibold rounded-md gap-1 text-xs",
        md: "px-3 py-1.5 rounded-[10px] text-sm",
        lg: "px-4.5 py-1.5 rounded-xl text-md",
        xl: "px-5 py-2 rounded-xl text-lg",
        icon: "px-4 py-3 rounded-[10px] h-auto min-w-9 aspect-square",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
