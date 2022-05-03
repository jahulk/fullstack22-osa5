import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  likes: 12,
  url: 'localhost.com',
  user: {
    name: 'matti'
  }
}

const currentUser = {
  username: 'tester',
  token: '1231231214',
  name: 'Donald Tester'
}

test('at the start only name and author are visible', () => {
  const mockHandler = jest.fn()

  const { container } = render(
    <Blog
      blog={blog}
      likeBlog={mockHandler}
      deleteBlog={mockHandler}
      currentUser={currentUser} />
  )

  expect(container).toHaveTextContent(blog.title)
  expect(container).toHaveTextContent(blog.author)
  expect(screen.queryByText(blog.url)).toBeNull()
  expect(screen.queryByText(blog.likes)).toBeNull()
})

test('after clicking view url and likes are shown aswell', async () => {
  const mockHandler = jest.fn()

  const { container } = render(
    <Blog
      blog={blog}
      likeBlog={mockHandler}
      deleteBlog={mockHandler}
      currentUser={currentUser} />
  )

  const user = userEvent.setup()

  const button = screen.getByText('view')
  await user.click(button)

  expect(container).toHaveTextContent(blog.title)
  expect(container).toHaveTextContent(blog.author)
  expect(container).toHaveTextContent(blog.likes)
  expect(container).toHaveTextContent(blog.url)
})

test('clicking the button twice calls event handler twice', async () => {
  const mockHandler = jest.fn()
  const likeBlog = jest.fn()

  const { container } = render(
    <Blog
      blog={blog}
      likeBlog={likeBlog}
      deleteBlog={mockHandler}
      currentUser={currentUser} />
  )

  const user = userEvent.setup()

  const button = screen.getByText('view')
  await user.click(button)
  expect(container).toHaveTextContent('like')

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(likeBlog.mock.calls).toHaveLength(2)
})