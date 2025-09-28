import { render, screen } from '@/test-utils'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'

describe('Card Component', () => {
  it('renders with children', () => {
    render(
      <Card>
        <div>Card content</div>
      </Card>
    )
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies default variant styles', () => {
    render(<Card>Default Card</Card>)
    expect(screen.getByText('Default Card')).toHaveClass('liquid-card')
  })

  it('applies glass variant styles', () => {
    render(<Card variant="glass">Glass Card</Card>)
    expect(screen.getByText('Glass Card')).toHaveClass('liquid-glass')
  })

  it('applies elevated variant styles', () => {
    render(<Card variant="elevated">Elevated Card</Card>)
    const card = screen.getByText('Elevated Card')
    expect(card).toHaveClass('liquid-card', 'hover:scale-105', 'transition-all', 'duration-300')
  })

  it('applies custom className', () => {
    render(<Card className="custom-class">Card</Card>)
    expect(screen.getByText('Card')).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Card ref={ref}>Card</Card>)
    expect(ref).toHaveBeenCalled()
  })
})

describe('Card Subcomponents', () => {
  it('renders CardHeader with correct styles', () => {
    render(
      <Card>
        <CardHeader>Header content</CardHeader>
      </Card>
    )
    expect(screen.getByText('Header content')).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
  })

  it('renders CardTitle with correct styles', () => {
    render(
      <Card>
        <CardTitle>Card Title</CardTitle>
      </Card>
    )
    expect(screen.getByRole('heading', { level: 3 })).toHaveClass('text-2xl', 'font-semibold', 'text-white')
  })

  it('renders CardDescription with correct styles', () => {
    render(
      <Card>
        <CardDescription>Card description</CardDescription>
      </Card>
    )
    expect(screen.getByText('Card description')).toHaveClass('text-sm', 'text-white/80')
  })

  it('renders CardContent with correct styles', () => {
    render(
      <Card>
        <CardContent>Content</CardContent>
      </Card>
    )
    expect(screen.getByText('Content')).toHaveClass('p-6', 'pt-0')
  })

  it('renders CardFooter with correct styles', () => {
    render(
      <Card>
        <CardFooter>Footer content</CardFooter>
      </Card>
    )
    expect(screen.getByText('Footer content')).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
  })
})
