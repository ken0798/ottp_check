import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function AuthProtect() {
  const user = useSelector((state) => state.user);

  if (!user?.token) {
    return <Navigate to="/auth" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default AuthProtect;
