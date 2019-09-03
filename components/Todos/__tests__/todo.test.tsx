import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Todo from '../Todo'
describe('Todo', () => {
  let mock: RenderResult

  beforeEach(() => {
    mock = render(
      <Todo
        id={'1'}
        isComplete={false}
        title={'Title'}
        description={'Description'}
        onClick={() => {}}
        dueDate={new Date().toISOString()}
      />,
    )
  })

  it('renders properly with given props', () => {
    expect(mock.baseElement).toBeTruthy()
  })
})
