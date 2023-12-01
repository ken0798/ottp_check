import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
function AuthProtect() {
  const token = useSelector(state => state.user?.token)

  console.log(token);
  if (!token) {
    return <Navigate to='/auth' />
  }
  return (
    <>
    <div style={{color:'#fff'}}>AuthProtect</div>
    <Outlet />
    </>
  )
}

export default AuthProtect