import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function PageLayout() {
  return (
    <>
      <div className="h-screen">
        <nav className="fixed">
          <NavLink to="">Home</NavLink>
          <NavLink to="problems">Solve</NavLink>
          <NavLink to="student">Student Problems</NavLink>
        </nav>
        <div className="h-full">
          <Outlet />
        </div>
        <footer className="fixed bottom-0">
          <p>This is a footer</p>
        </footer>
      </div>
    </>
  );
}
