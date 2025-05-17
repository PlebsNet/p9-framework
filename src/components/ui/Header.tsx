import * as React from "react"

import { cn } from "@/lib/utils"

const Header = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <header
    ref={ref}
    className={cn(
      "max-w-5xl flex flex-col flex-wrap items-center mx-[92px] px-6",
      className
    )}
    {...props}
  />
))
Header.displayName = "Header"

const HeaderCover = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "max-h-[376px] w-full mx-auto",
      className
    )}
    {...props}
  />
))
HeaderCover.displayName = "HeaderCover"

const HeaderSubtitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full m-0 p-0 text-sm font-medium text-brand-500 text-center",
      className
    )}
    {...props}
  />
))
HeaderSubtitle.displayName = "HeaderSubtitle"

const HeaderTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "w-full max-w-[640px] my-2 pb-4 text-[65px] text-center font-semibold tracking-[-1.25px] leading-[65px] gradient-text",
      className
    )}
    {...props}
  />
))
HeaderTitle.displayName = "HeaderTitle"

const HeaderDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "w-full m-0 mb-8 p-0 text-[18px] font-medium tracking-[-0.25px] leading-[24px] text-center",
      className
    )}
    {...props}
  />
))
HeaderDescription.displayName = "HeaderDescription"

export { Header, HeaderSubtitle, HeaderTitle, HeaderDescription }
