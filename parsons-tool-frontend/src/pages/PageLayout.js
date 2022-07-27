import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../data/AuthContext';

export default function PageLayout() {
  const { isLoggedIn, signOut } = useAuth();

  return (
    <>
      <div className="h-screen">
        <nav className="relative px-3 py-3 top-0 left-0">
          <NavLink to="">| Home </NavLink>
          <NavLink to="student">| Student Problems </NavLink>
          <NavLink to="create">| Create Problem </NavLink>
          {isLoggedIn ? (
            <button onClick={signOut} className="px-3 py-1 rounded-full text-white bg-red-400 hover:bg-red-500">
              Sign Out
            </button>
          ) : (
            <NavLink to="login" className="px-3 py-1 rounded-full text-white bg-blue-400 hover:bg-blue-500">
              Sign In
            </NavLink>
          )}
        </nav>
        <div className="h-full">
          <Outlet />
        </div>
        <footer className="fixed bottom-0"></footer>
      </div>
    </>
  );
}
