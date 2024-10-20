import '@testing-library/jest-dom'

import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Lobby } from '.'

describe(Lobby, () => {
  it('should render', () => {
    render(<Lobby />)

    expect(screen.getByText('Lobby')).toBeInTheDocument()
  })
})
