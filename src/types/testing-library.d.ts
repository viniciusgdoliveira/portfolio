declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveTextContent(text: string): R
      toHaveClass(...classNames: string[]): R
      toBeDisabled(): R
      toBeEnabled(): R
      toHaveAttribute(attribute: string, value?: string): R
      toHaveValue(value: string | string[] | number): R
      toBeChecked(): R
      toBePartiallyChecked(): R
      toHaveFocus(): R
      toBeVisible(): R
      toBeEmptyDOMElement(): R
      toContainElement(element: HTMLElement | null): R
      toContainHTML(html: string): R
      toHaveAccessibleDescription(description?: string | RegExp): R
      toHaveAccessibleName(name?: string | RegExp): R
      toHaveFormValues(expectedValues: Record<string, any>): R
      toHaveStyle(css: string | Record<string, any>): R
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R
      toHaveDescription(description?: string | RegExp): R
      toHaveName(name?: string | RegExp): R
      toHaveRole(role: string): R
    }
  }
}

export {}
