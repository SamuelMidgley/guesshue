import { describe, expect, it } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it.each`
    classNames         | expectedOutput
    ${'flex flex'}     | ${`flex`}
    ${'flex flex-col'} | ${`flex flex-col`}
    ${'w-full w-2'}    | ${`w-2`}
  `(
    'should return expectedOutput: $expectedOutput given input: $classNames',
    ({ classNames, expectedOutput }) => {
      const ouput = cn(classNames)

      expect(ouput).toBe(expectedOutput)
    }
  )
})
