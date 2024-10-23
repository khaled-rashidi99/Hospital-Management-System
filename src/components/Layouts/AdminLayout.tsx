import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearToken } from "../../store/authSlice";
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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import BadgeIcon from "@mui/icons-material/Badge";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AuthGuard from "../AuthGuard";

const drawerWidth = 240;

const navigationList = [
  { title: "Dashboard", icon: <HomeIcon />, route: "/" },
  { title: "Departments", icon: <ApartmentIcon />, route: "/department" },
  { title: "Rooms", icon: <BedroomChildIcon />, route: "/rooms" },
  { title: "Doctors", icon: <BadgeIcon />, route: "/doctors" },
  { title: "Services", icon: <MedicalServicesIcon />, route: "/services" },
  { title: "Patients", icon: <ContactEmergencyIcon />, route: "/patients" },
  { title: "Surgeries", icon: <MonitorHeartIcon />, route: "/surgicals" },
  {
    title: "Room Tracking",
    icon: <LocationSearchingIcon />,
    route: "/roomstracking",
  },
];

interface AdminLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedRoute, setSelectedRoute] = useState(location.pathname);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setSelectedRoute(location.pathname);
  }, [location.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigateTo = (route: string) => {
    navigate(route);
    setSelectedRoute(route);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    dispatch(clearToken());
    navigate("/login");
    setLogoutDialogOpen(false);
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const drawer = (
    <div>
      <Toolbar>
        <img
          src="/favicon.ico"
          alt="Logo"
          style={{ width: 40, height: 40, marginRight: 8 }}
        />
        <a href="" className="text-[#64a3b4]">
          <Typography variant="h6" noWrap component="div">
            iHMS App
          </Typography>
        </a>
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
                  backgroundColor: theme.palette.action.selected,
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
    <AuthGuard>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              {title}
            </Typography>
            <Button
              color="inherit"
              onClick={handleLogoutClick}
              startIcon={<ExitToAppIcon />}
            >
              {isMobile ? "" : "Logout"}
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
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
              display: { xs: "none", sm: "block" },
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
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {children}
        </Box>
        <Dialog
          open={logoutDialogOpen}
          onClose={handleLogoutCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to log out?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLogoutCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleLogoutConfirm} color="primary" autoFocus>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AuthGuard>
  );
}
