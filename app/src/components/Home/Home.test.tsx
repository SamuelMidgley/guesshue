import '@testing-library/jest-dom'

import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Home } from '.'

describe(Home, () => {
  it('should render and default to asking your name', () => {
    render(<Home />)

    expect(screen.getByText('What is your name?')).toBeInTheDocument()
  })
})
