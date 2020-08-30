import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar(props) {
  const { isAuthenticated, userHasScopes, login, logout } = props.auth;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        QuickHealth
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              home <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">
              about
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={isAuthenticated() ? logout : login}
            >
              {isAuthenticated() ? 'log out' : 'log in'}
            </button>
          </li>
          }
          {isAuthenticated() && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/private">
                Private
              </NavLink>
            </li>
          )}
          {isAuthenticated() && userHasScopes(['read:courses']) && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/courses">
                Courses
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin">
              Admin
            </NavLink>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
