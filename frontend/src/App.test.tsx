import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from './App'

describe(App, () => {
  it('should render loading screen when app not connected', () => {
    render(<App />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
