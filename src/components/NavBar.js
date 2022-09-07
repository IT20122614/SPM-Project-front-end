import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ user, isAdmin }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" alt="#">
          Trip planning System
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav" style={{ marginLeft: "55%" }}>
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/plannings">
                  My Planings
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/plannings">
                  Dashboard
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/logout"
                  onClick={() => {
                    window.location = "/login";
                  }}
                >
                  Logout
                </NavLink>
              </li>
            </React.Fragment>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
