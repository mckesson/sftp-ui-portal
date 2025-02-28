import { useDispatch, useSelector } from "react-redux";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Box, Drawer, IconButton, List } from "@mui/material";
import { toggleDrawer } from "../redux/Slices/drawerSlice";
import MenuIcon from "@mui/icons-material/Menu";
import { ReactNode } from "react";
import { menuItems } from "../utils/sideMenuItems";

interface SideNavProps {
  children: ReactNode;
}

const SideNav = ({ children }: SideNavProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state?.user);
  const { isDrawerOpen } = useSelector((state) => state?.drawer);

  //Redux state to toggle the drawer.
  const handleDrawerToggle = () => {
    dispatch(toggleDrawer());
  };

  return (
    <div className="content-wrapper">
      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <Box className="icon-box">
          <IconButton sx={{ paddingTop: "0" }} onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <div className="logo">
            <span className="desktop" onClick={() => navigate("/")}></span>
          </div>
        </Box>
        <List className="sidebar">
          {menuItems
            .filter((menu) => menu.role === role)
            .map((menu) =>
              menu.items.map((item) => (
                <li className="sidebar-menu" key={item.path}>
                  <span>
                    <NavLink to={item.path}>{item.label}</NavLink>
                  </span>
                  <ArrowForwardIosIcon className="arrow-icon" />
                </li>
              ))
            )}
        </List>
      </Drawer>

      {/* Main Content */}
      <main className="main-content">{children}</main>
    </div>
  );
};

export default SideNav;
