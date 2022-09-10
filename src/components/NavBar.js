import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import HikingIcon from "@mui/icons-material/Hiking";
import { NavLink } from "react-router-dom";


const beforePages = [
  { name: "Sign In", link: "/login" },
  { name: "Register", link: "/register" },
];
const afterPages = [
  { name: "Home", link: "/home" },
  { name: "My Plannings", link: "/plannings" },
];
//const settings = [{ name: "Account Settings", link: "/profile" }, {"Sign Out"}];

const NavBar = ({ user, isAdmin }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState(
    localStorage.getItem("selectedNav" || "Home")
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    console.log(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSelect = (item) => {
    setSelectedItem(localStorage.getItem("selectedNav"));
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HikingIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TRIPO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {user
                ? afterPages.map((page, index) => (
                    <NavLink className="nav-link" to={page.link}>
                      <MenuItem key={index} onClick={handleCloseNavMenu}>
                        {page.name}
                      </MenuItem>
                    </NavLink>
                  ))
                : beforePages.map((page, index) => (
                    <NavLink className="nav-link" to={page.link}>
                      <MenuItem key={index} onClick={handleCloseNavMenu}>
                        {page.name}
                      </MenuItem>
                    </NavLink>
                  ))}
            </Menu>
          </Box>
          <HikingIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TRIPO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {user
              ? afterPages.map((page, index) => (
                  <NavLink className="nav-link" to={page.link}>
                    <MenuItem
                      key={index}
                    onClick={() => {
                        localStorage.setItem("selectedNav", page.name);
                        handleCloseNavMenu();
                        handleSelect(page.name);
                      }}
                      style={
                        page.name === selectedItem
                          ? { borderBottom: "3px solid" }
                          : {}
                      }
                    >
                      {page.name}
                    </MenuItem>
                  </NavLink>
                ))
              : beforePages.map((page, index) => (
                  <NavLink className="nav-link" to={page.link}>
                    <MenuItem
                      key={index}
                    onClick={() => {
                        localStorage.setItem("selectedNav", page.name);
                        handleCloseNavMenu();
                        handleSelect(page.name);
                      }}
                      style={
                        page.name === selectedItem
                          ? { borderBottom: "3px solid" }
                          : {}
                      }
                    >
                      {page.name}
                    </MenuItem>
                  </NavLink>
                ))}
          </Box>
          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  style={{
                    backgroundColor: "#2074d4",
                    color: "white",
                    fontSize: "10px",
                  }}
                >
                  <Typography style={{ fontSize: "12px" }}>
                    {user.sub}
                  </Typography>
                </MenuItem>
                
                  <NavLink className="nav-link" to={"/dashboard"}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <AdminPanelSettingsIcon style={{ marginRight: "1rem" }} />
                      DashBoard
                    </MenuItem>
                  </NavLink>
                
                <NavLink className="nav-link" to={"/profile"}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <SettingsIcon style={{ marginRight: "1rem" }} />
                    Account Settings
                  </MenuItem>
                </NavLink>
                
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;