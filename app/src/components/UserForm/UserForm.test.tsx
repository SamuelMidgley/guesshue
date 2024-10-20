import '@testing-library/jest-dom'

import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UserForm } from './UserForm'

describe(UserForm, () => {
  it('should render', () => {
    render(<UserForm />)

    expect(screen.getByText('What is your name?')).toBeInTheDocument()
  })
})
