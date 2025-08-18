import React from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import BlogEditor from '../../components/admin/BlogEditor'

export default function CreateBlog() {
  return (
    <AdminLayout>
      <BlogEditor />
    </AdminLayout>
  )
}