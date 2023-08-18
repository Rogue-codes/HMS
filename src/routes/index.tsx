/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

interface PrivateRouteProps{
  children: ReactNode
}
export default function PrivateRoute({children}:PrivateRouteProps) {
  const isLoggedIn = useSelector((state:any)=>state.auth.isLoggedIn)

  return !isLoggedIn ? <Navigate to='/login'/> : children
}
