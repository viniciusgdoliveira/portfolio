declare module 'jest-axe' {
  import { AxeResults } from 'axe-core'

  export function axe(container?: Element | Document): Promise<AxeResults>
  export function toHaveNoViolations(): jest.CustomMatcher

  declare global {
    namespace jest {
      interface Matchers<R> {
        toHaveNoViolations(): R
      }
    }
  }
}
