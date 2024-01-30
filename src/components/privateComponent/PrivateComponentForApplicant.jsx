import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateComponentForApplicant() {
  const auth = localStorage.getItem("applicantToken");

  return <div>{auth ? <Outlet /> : <Navigate to="/login" />}</div>;
}
