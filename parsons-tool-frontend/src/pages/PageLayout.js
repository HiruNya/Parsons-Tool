import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function PageLayout() {
  return (
    <>
      <div>
        <nav>
          <NavLink to="">Home</NavLink>
          <NavLink to="problems">Solve</NavLink>
          <NavLink to="student">Student Problems</NavLink>
        </nav>
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  );
}
