import { useEffect, useRef } from 'react'

/**
 * Hook for managing focus in modals, dropdowns, and other interactive components
 * @param isOpen - Whether the component is open/visible
 * @param options - Configuration options
 * @returns ref to attach to the element that should receive focus
 */
export function useFocusManagement(
  isOpen: boolean,
  options: {
    /** Whether to focus on open */
    focusOnOpen?: boolean
    /** Whether to restore focus to previous element on close */
    restoreFocus?: boolean
    /** Delay before focusing (useful for animations) */
    focusDelay?: number
  } = {}
) {
  const {
    focusOnOpen = true,
    restoreFocus = true,
    focusDelay = 0
  } = options

  const focusRef = useRef<HTMLElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen && focusOnOpen && focusRef.current) {
      // Store the currently focused element
      if (restoreFocus) {
        previousActiveElement.current = document.activeElement as HTMLElement
      }

      // Focus with optional delay
      const focusElement = () => {
        if (focusRef.current) {
          focusRef.current.focus()
        }
      }

      if (focusDelay > 0) {
        const timeoutId = setTimeout(focusElement, focusDelay)
        return () => clearTimeout(timeoutId)
      } else {
        focusElement()
      }
    } else if (!isOpen && restoreFocus && previousActiveElement.current) {
      // Restore focus to the previously focused element
      previousActiveElement.current.focus()
      previousActiveElement.current = null
    }
  }, [isOpen, focusOnOpen, restoreFocus, focusDelay])

  return focusRef
}

/**
 * Hook for managing focus trap in modals and dialogs
 * @param isOpen - Whether the component is open/visible
 * @param containerRef - Ref to the container element
 */
export function useFocusTrap(isOpen: boolean, containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!isOpen || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab (backwards)
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab (forwards)
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    // Focus the first element
    firstElement.focus()

    // Add event listener
    container.addEventListener('keydown', handleTabKey)

    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  }, [isOpen, containerRef])
}

/**
 * Hook for managing escape key handling
 * @param isOpen - Whether the component is open/visible
 * @param onEscape - Callback function to execute on escape key
 */
export function useEscapeKey(isOpen: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!isOpen) return

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape()
      }
    }

    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, onEscape])
}
