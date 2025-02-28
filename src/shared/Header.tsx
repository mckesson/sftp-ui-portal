import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userIcon from "../assets/user.jpg";
import MenuIcon from "@mui/icons-material/Menu";
import {
  IconButton,
  TextField,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
  Box,
  useMediaQuery,
} from "@mui/material";
import { switchRole } from "../redux/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../redux/Slices/drawerSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state?.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const matches = useMediaQuery("(min-width:600px)");

  // Open/Close dropdown menu
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    navigate("/");
  };

  // Handle role change
  const handleRoleSwitch = (role: string) => {
    dispatch(switchRole(role));
    handleMenuClose();
  };

  const handleDrawerToggle = () => {
    dispatch(toggleDrawer());
  };

  return (
    <header className="header">
      {/* Top Navigation */}
      <div className="header-top">
        <nav className="top-nav">
          <a href="#"></a>
          <a href="#"></a>
          <a href="#"></a>
          {/* <a href="#">Client Partner</a>
          <a href="#">McKesson Business</a>
          <a href="#">McKesson Admin</a> */}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="header-bottom">
        <Box style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <div className="logo">
            <span className="desktop" onClick={() => navigate("/")}></span>
          </div>
        </Box>
        {/* <div className="main-nav">
          <TextField
            variant="outlined"
            placeholder="Search For Client Partners"
            size="small"
            className="search-input"
            sx={{
              width: { xs: "100%" },
            }}
          />
          <IconButton
            className="search-icon"
            sx={{ backgroundColor: "#143359", color: "#fff" }}
          >
            <SearchIcon />
          </IconButton>
        </div> */}

        {/* Account Section with Dropdown */}
        <div className="account">
          <img
            className="user-icon"
            src={userIcon}
            alt={"user"}
            onClick={handleMenuClick}
          />
          <Tooltip title={role} arrow>
            <Typography className="user-name" onClick={handleMenuClick}>
              John Doe
            </Typography>
          </Tooltip>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "user-menu-button",
            }}
          >
            <MenuItem disabled>Select Role</MenuItem>
            <MenuItem
              onClick={() => handleRoleSwitch("System Administrator")}
              className={role === "System Administrator" ? "role-active" : ""}
            >
              System Administrator
            </MenuItem>
            <MenuItem
              onClick={() => handleRoleSwitch("Business Administrator")}
              className={role === "Business Administrator" ? "role-active" : ""}
            >
              Business Administrator
            </MenuItem>
            <MenuItem
              onClick={() => handleRoleSwitch("Trading Partner")}
              className={role === "Trading Partner" ? "role-active" : ""}
            >
              Trading Partner
            </MenuItem>
            <MenuItem
              onClick={() => handleRoleSwitch("Report User")}
              className={role === "Report User" ? "role-active" : ""}
            >
              Report User
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
