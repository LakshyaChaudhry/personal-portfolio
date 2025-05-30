import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

// Types
type TimelineContextValue = {
  activeStep: number
  setActiveStep: (step: number) => void
}

// Context
const TimelineContext = React.createContext<TimelineContextValue | undefined>(
  undefined
)

const useTimeline = () => {
  const context = React.useContext(TimelineContext)
  if (!context) {
    throw new Error("useTimeline must be used within a Timeline")
  }
  return context
}

// Components
interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: number
  value?: number
  onValueChange?: (value: number) => void
  orientation?: "horizontal" | "vertical"
}

function Timeline({
  defaultValue = 1,
  value,
  onValueChange,
  orientation = "vertical",
  className,
  ...props
}: TimelineProps) {
  const [activeStep, setInternalStep] = React.useState(defaultValue)

  const setActiveStep = React.useCallback(
    (step: number) => {
      if (value === undefined) {
        setInternalStep(step)
      }
      onValueChange?.(step)
    },
    [value, onValueChange]
  )

  const currentStep = value ?? activeStep

  return (
    <TimelineContext.Provider
      value={{ activeStep: currentStep, setActiveStep }}
    >
      <div
        data-slot="timeline"
        className={cn(
          "group/timeline flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
          className
        )}
        data-orientation={orientation}
        {...props}
      />
    </TimelineContext.Provider>
  )
}

// TimelineContent
function TimelineContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="timeline-content"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

// TimelineDate
interface TimelineDateProps extends React.HTMLAttributes<HTMLTimeElement> {
  asChild?: boolean
}

function TimelineDate({
  asChild = false,
  className,
  ...props
}: TimelineDateProps) {
  const Comp = asChild ? Slot : "time"

  return (
    <Comp
      data-slot="timeline-date"
      className={cn(
        "text-muted-foreground mb-1 block text-xs font-medium group-data-[orientation=vertical]/timeline:max-sm:h-4",
        className
      )}
      {...props}
    />
  )
}

// TimelineHeader
function TimelineHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="timeline-header" className={cn(className)} {...props} />
  )
}

// TimelineIndicator - Enhanced to support logos
interface TimelineIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  logo?: string
  company?: string
  current?: boolean
}

function TimelineIndicator({
  className,
  children,
  logo,
  company,
  current = false,
  ...props
}: TimelineIndicatorProps) {
  return (
    <div
      data-slot="timeline-indicator"
      className={cn(
        "flex items-center justify-center rounded-full border-2 bg-white shadow-lg transition-all duration-500",
        current ? "size-12 border-blue-500 ring-4 ring-blue-100" : "size-10 border-gray-300",
        className
      )}
      aria-hidden="true"
      {...props}
    >
      {logo ? (
        <img 
          src={logo} 
          alt={`${company} logo`}
          className="rounded-full object-cover"
          style={{ width: current ? '32px' : '28px', height: current ? '32px' : '28px' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const nextElement = target.nextElementSibling as HTMLElement;
            if (nextElement) {
              nextElement.style.display = 'flex';
            }
          }}
        />
      ) : null}
      {children}
    </div>
  )
}

// TimelineItem - Enhanced with animation support
interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number
  isVisible?: boolean
  index?: number
}

function TimelineItem({ 
  step, 
  className, 
  isVisible = true, 
  index = 0,
  ...props 
}: TimelineItemProps) {
  const { activeStep } = useTimeline()

  return (
    <div
      data-slot="timeline-item"
      className={cn(
        "group/timeline-item has-[+[data-completed]]:[&_[data-slot=timeline-separator]]:bg-primary relative flex flex-1 flex-col gap-0.5 transition-all duration-700 ease-out group-data-[orientation=horizontal]/timeline:mt-8 group-data-[orientation=horizontal]/timeline:not-last:pe-8 group-data-[orientation=vertical]/timeline:ms-8 group-data-[orientation=vertical]/timeline:not-last:pb-12",
        isVisible 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 translate-x-8',
        className
      )}
      style={{ 
        transitionDelay: `${index * 200}ms` 
      }}
      data-completed={step <= activeStep || undefined}
      {...props}
    />
  )
}

// TimelineSeparator - Enhanced with animation
function TimelineSeparator({
  className,
  isVisible = true,
  index = 0,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { isVisible?: boolean, index?: number }) {
  return (
    <div
      data-slot="timeline-separator"
      className={cn(
        "absolute left-5 w-0.5 bg-gray-300 transition-all duration-1000 ease-out",
        isVisible ? 'h-full' : 'h-0',
        className
      )}
      style={{ 
        top: '48px', // Start below the indicator
        bottom: '-48px', // Extend to next indicator
        transitionDelay: `${index * 200 + 600}ms` 
      }}
      aria-hidden="true"
      {...props}
    />
  )
}

// TimelineTitle
function TimelineTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-slot="timeline-title"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  )
}

export {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
}