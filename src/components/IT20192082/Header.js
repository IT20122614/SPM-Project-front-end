//import useState hook to create menu collapse state
import React, { useState } from "react";
import { Link } from "react-router-dom";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
// import { FaList } from "react-icons/fa";
// import {
//   FiHome,
//   FiLogOut,
//   FiArrowLeftCircle,
//   FiArrowRightCircle,
// } from "react-icons/fi";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";

const Header = () => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {/* {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />} */}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem>
                Home
                <Link to="/adminPlace" />
              </MenuItem>
              <MenuItem>
                Report
                <Link to="/user/report" />
              </MenuItem>
              <MenuItem>
                Request List
                <Link to="/user/place" />
              </MenuItem>
              
            </Menu>
          </SidebarContent>
          
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
