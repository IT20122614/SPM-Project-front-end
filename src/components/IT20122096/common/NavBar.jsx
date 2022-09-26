import React from 'react'
import { NavLink } from 'react-router-dom';
import { logout } from './../../../services/IT20122096/authServices';


const NavBar = ({user,isAdmin}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
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
            {!user && (
              <React.Fragment>
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
              </React.Fragment>
            )}
            {user && (
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
                {isAdmin && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/plannings">
                      Dashboard
                    </NavLink>
                  </li>
                )}

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
                      logout();
                      window.location = "/login";
                    }}
                  >
                    Logout
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
 
export default NavBar;