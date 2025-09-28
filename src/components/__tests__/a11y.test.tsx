import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'

expect.extend(toHaveNoViolations)

describe('Accessibility Tests', () => {
  it('Button should not have accessibility violations', async () => {
    const { container } = render(<Button>Accessible Button</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Button with aria-label should not have accessibility violations', async () => {
    const { container } = render(
      <Button aria-label="Close dialog">×</Button>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Disabled Button should not have accessibility violations', async () => {
    const { container } = render(
      <Button disabled aria-label="Disabled action">
        Disabled Button
      </Button>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Card should not have accessibility violations', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
          <CardDescription>This is a test card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content goes here</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </Card>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Card with proper heading structure should not have accessibility violations', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle as="h2">Section Title</CardTitle>
          <CardDescription>Section description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content with proper heading hierarchy</p>
        </CardContent>
      </Card>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Button variants should not have accessibility violations', async () => {
    const variants = ['primary', 'secondary', 'glass', 'outline'] as const
    
    for (const variant of variants) {
      const { container } = render(
        <Button variant={variant} aria-label={`${variant} button`}>
          {variant} Button
        </Button>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    }
  })

  it('Button sizes should not have accessibility violations', async () => {
    const sizes = ['sm', 'md', 'lg'] as const
    
    for (const size of sizes) {
      const { container } = render(
        <Button size={size} aria-label={`${size} button`}>
          {size} Button
        </Button>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    }
  })
})
