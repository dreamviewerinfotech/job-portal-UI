import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateComponent() {
  const auth = localStorage.getItem("employerToken");

  return <div>{auth ? <Outlet /> : <Navigate to="/login" />}</div>;
}
