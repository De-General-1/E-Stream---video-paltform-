import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
  const currentUser = useSelector((state) => state.user.currentUser)

  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export default AdminRoute
