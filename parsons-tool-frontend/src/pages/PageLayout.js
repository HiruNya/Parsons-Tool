import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../data/AuthContext';

export default function PageLayout() {
  const { isLoggedIn, isLecturer, signOut } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    signOut();
    navigate('/home');
  }

  return (
    <>
      <div className="h-screen">
        <nav className="relative px-3 py-3 top-0 left-0">
          <NavLink to="student">Student Problems </NavLink>
          {isLecturer ? <NavLink to="create">| Create Problem </NavLink> : ''}
          {isLecturer ? <NavLink to="data"> | Data </NavLink> : ''}
          {isLoggedIn ? (
            <button
              onClick={() => handleLogout()}
              className="px-3 py-1 rounded-full text-white bg-red-400 hover:bg-red-500"
            >
              Sign Out
            </button>
          ) : (
            ''
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
