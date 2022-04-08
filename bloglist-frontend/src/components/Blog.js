import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!visible) {
    return (
      <div style={blogStyle}>
        <p>{blog.title} {blog.author} <button onClick={() => setVisible(true)}>view</button></p>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <p>{blog.title} {blog.author} <button onClick={() => setVisible(false)}>hide</button></p>
      <p>{blog.url}</p>
      <p>{blog.likes} <button onClick={() => likeBlog(blog)}>like</button></p>
      {blog.user && blog.user.username === currentUser.username && <button onClick={() => deleteBlog(blog)}>remove</button>}
    </div>
  )
}

export default Blog