import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as ROUTES from "@/constants/routes";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/actions/auth";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  useMediaQuery,
  Card,
  CardContent,
  ListItemButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeToggleButton from "../themeToggleBtn";

const Navigation = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("phoneNumber");
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = (
    <List
      sx={{
        height: "95vh",
        padding: "10px 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <ListItemButton
          component={Link}
          to={ROUTES.HOME}
          sx={{ borderRadius: "5px" }}
          selected={location.pathname === ROUTES.HOME}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            sx={{ color: theme.palette.text.primary }}
            primary="Services"
          />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to={ROUTES.PROFILE}
          sx={{ borderRadius: "5px" }}
          selected={location.pathname === ROUTES.PROFILE}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText
            sx={{ color: theme.palette.text.primary }}
            primary="Profile"
          />
        </ListItemButton>
      </Box>
      <Box>
        <ThemeToggleButton />

        <ListItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Box>
    </List>
  );

  return (
    <>
      {isMdUp ? (
        <Card
          sx={{
            width: 250,
            height: "100vh",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(15px)",
          }}
        >
          <CardContent>{menuItems}</CardContent>
        </Card>
      ) : (
        <>
          <AppBar
            position="fixed"
            sx={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(15px)",
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 250 }}>{menuItems}</Box>
          </Drawer>
        </>
      )}
    </>
  );
};

export default Navigation;
