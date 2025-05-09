import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none font-semibold touch-manipulation transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-zinc-100 text-zinc-900 shadow hover:bg-zinc-100/90",
        secondary:
          "bg-zinc-800 text-zinc-100 shadow-sm hover:bg-zinc-800/80",
        positive:
          "bg-emerald-500 text-zinc-100 shadow-sm hover:bg-emerald-500/90",
        destructive:
          "bg-rose-500 text-zinc-100 shadow-sm hover:bg-rose-500/90",
        outline:
          "border bg-transparent hover:shadow-sm hover:bg-zinc-100/90 hover:text-zinc-900",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "px-3 py-1 rounded-sm text-xs",
        sm: "px-3 py-2 rounded-md text-xs",
        md: "h-[34px] px-4 py-2 text-md rounded-[10px]",
        lg: "h-10 px-8 rounded-lg text-lg",
        xl: "px-10 py-4 rounded-lg text-lg",
        icon: "h-9 w-9",
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
