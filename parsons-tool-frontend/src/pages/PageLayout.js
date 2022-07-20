import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function PageLayout() {
  return (
    <>
      <div className="h-screen">
        <nav className="relative top-0 left-0">
          <NavLink to="">| Home </NavLink>
          <NavLink to="student">| Student Problems </NavLink>
          <NavLink to="create">| Create Problem </NavLink>
        </nav>
        <div className="h-full">
          <Outlet />
        </div>
        <footer className="fixed bottom-0"></footer>
      </div>
    </>
  );
}
