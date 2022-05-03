import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('when creating a new blog addBlog is called with correct values', async () => {
  const addBlog = jest.fn()

  render(<BlogForm addBlog={addBlog} />)

  const user = userEvent.setup()

  const inputs = screen.getAllByRole('textbox')
  await userEvent.type(inputs[0], 'otsikko')
  await userEvent.type(inputs[1], 'kirjailija')
  await userEvent.type(inputs[2], 'localhost')

  const submitButton = screen.getByText('create')
  await user.click(submitButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0]).toBe('otsikko')
  expect(addBlog.mock.calls[0][1]).toBe('kirjailija')
  expect(addBlog.mock.calls[0][2]).toBe('localhost')
})