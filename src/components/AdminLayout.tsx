import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import BadgeIcon from "@mui/icons-material/Badge";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import {
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  AppBar,
  CssBaseline,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 280;

export default function AdminLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const navigationList = [
    { title: "Dashboard", icon: <HomeIcon />, route: "/" },
    {
      title: "Department Management",
      icon: <ApartmentIcon />,
      route: "/department",
    },
    {
      title: "Room Management",
      icon: <BedroomChildIcon />,
      route: "/rooms",
    },
    {
      title: "Doctor Management",
      icon: <BadgeIcon />,
      route: "/doctors",
    },
    {
      title: "Services Management",
      icon: <MedicalServicesIcon />,
      route: "/services",
    },
  ];
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRoute, setSelectedRoute] = React.useState(location.pathname);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const navigateTo = (route: string) => {
    navigate(route);
    setSelectedRoute(route);
    if (mobileOpen) {
      handleDrawerClose();
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <a href="#">
          <img
            src="/favicon.ico"
            alt=""
            style={{ width: 40, height: 40, padding: 4 }}
          />
        </a>
        <h1 className="text-lg p-1">
          <a href="#" className="text-[#64a3b4]">
            iHMS App
          </a>
        </h1>
      </Toolbar>
      <Divider />
      <List>
        {navigationList.map(({ title, icon, route }) => (
          <ListItem key={title} disablePadding>
            <ListItemButton
              onClick={() => navigateTo(route)}
              selected={selectedRoute === route}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#e3f2fd",
                  "&:hover": {
                    backgroundColor: "#bbdefb",
                  },
                },
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar className="justify-between ">
          <div className="flex items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {title}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
