import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const location = useLocation()

  if (!currentUser) {
    return <Navigate to="/signin" state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute