import Logo from "../../assets/images/Logo-removebg.png";
import * as React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { Header } from "./Header";
import {
  ListItem,
  List,
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  ListItemButton,
  ListItemIcon,
  Toolbar,
} from "@mui/material";

import DocIcon from '../../assets/images/DocIcon.svg'
import DocIconBlue from '../../assets/images/DocIcon2.svg'
import ProjectIcon from '../../assets/images/projectIcon.svg'
import ProjectIconBlue from '../../assets/images/projectIcon2.svg'
import UserIcon from '../../assets/images/UserIcon.svg'
import UserIconBlue from '../../assets/images/UserIcon2.svg'
import VideoIconBlue from '../../assets/images/video_icon_blue.svg'
import VideoIcon from '../../assets/images/video_icon.svg'
import TestimonialsIcon from '../../assets/images/customer-testimonial-icon.svg'
import TestimonialsIconBlue from '../../assets/images/customer-testimonial-blueicon.svg'
import { allProjects } from "../../services/projects.service";
import { allDocuments } from "../../services/documents.service";


import ChatBox from "../ChatBox";
import MessageIcon from '../../assets/images/MessageIcon.svg'
import MessageIconBlue from '../../assets/images/MessageIcon2.svg'

export default function Sidebar(props) {
  const { window, isSidebarVisible } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [drawerWidth, setDrawerWidth] = React.useState(300)
  const navigation = useNavigate();
  const location = useLocation();
  const checkUrlEndPoint = location.pathname;
  const userDetails = JSON.parse(localStorage.getItem("userDetails"))
  const role = userDetails.isAdmin
  const [selectedIndex, setSelectedIndex] = React.useState(2);
  const [showModule, setShowModule] = React.useState([
    { module: "Projects", value: false },
    { module: "Documents", value: false },
    { module: "Users", value: false },
    { module: "Videos", value: false },
    { module: "Testimonials", value: false },
    { module: "Support", value: false },
  ]);

  const fetchData = async (info, moduleKey) => {
    try {

      const response = await info();
      if (response) {
        setShowModule((preValue) => {
          const updateValue = preValue?.map((item) => {
            if (item?.module === moduleKey && response?.data?.length === 0) {
              return { module: moduleKey, value: true }
            }
            else {
              return item;
            }
          })
          return updateValue

        })
      }

    } catch (error) {
      console.log("Error fetching data : ", error)
    }
  }


  React.useEffect(() => {
    if (location?.pathname?.includes('/viewproject')) {
      setDrawerWidth(0)
    } else {
      setDrawerWidth(300)
    }
  }, [location, location?.pathname])

  React.useEffect(() => {
    fetchData(allProjects, 'Projects')
    fetchData(allDocuments, 'Documents');
    fetchData(allProjects, 'Videos')
  }, [])

  const MenuList = [
    {
      name: "Projects",
      icon: ProjectIcon,
      blueIcon: ProjectIconBlue,
      link: "/projects",
      altName: 'project-icon',
    },
    {
      name: "Documents",
      icon: DocIcon,
      blueIcon: DocIconBlue,
      link: "/documents",
      altName: "doc-icon",
    },
    {
      name: "Users",
      icon: UserIcon,
      blueIcon: UserIconBlue,
      link: "/users",
      altName: "user-icon",
    },
    {
      name: "Videos",
      icon: VideoIcon,
      blueIcon: VideoIconBlue,
      link: "/videos",
      altName: 'video-icon'
    },
    {
      name: "Testimonials",
      icon: TestimonialsIcon,
      blueIcon: TestimonialsIconBlue,
      link: "/testimonials",
      altName: 'testimonials-icon'
    },
    {
      name: "Support",
      icon: MessageIcon,
      blueIcon: MessageIconBlue,
      link: "/support",
      altName: "message-icon",
    },
  ];


  const handleDrawerToggle = (index) => {
    setMobileOpen(!mobileOpen);
    setSelectedIndex(index);

  };

  const drawer = (
    <Box>
      <Box
        sx={{
          pb: 3,
          px: 4,
        }}
        className="mt-10 sm:mt-16 md:mt-20"

      >
        <img
          src={Logo}
          alt="NkLogo"
          title="nk"
          width={120}
          onClick={() => {
            navigation("/testimonials");
          }}
        />
      </Box>
      <List className="mx-auto ">
        {MenuList?.map((text, index) =>
          !role &&
            (text.name == "Users" ||
              text.name == "Support" ||
              (showModule[index]?.module === text?.name &&
                showModule[index]?.value)) ? (
            <></>
          ) : (
            <NavLink
              to={text?.link}
              className={({ isActive }) =>
                `flex ${isActive
                  ? " bg-white text-[#34d399] ml-10 rounded-l-full"
                  : "text-white ml-10 bg-[#34d399]"
                }`
              }
              key={index}
            >
              <ListItemButton
                className="w-full flex pl-10"
                onClick={() => {
                  handleDrawerToggle(index);
                }}
              >
                <Box>
                  <img
                    src={
                      location?.pathname.includes(text?.link)
                        ? text?.blueIcon
                        : text?.icon
                    }
                    alt={text?.altName}
                  />
                </Box>
                <Box className={`${"text-base font-medium p-3"} `}>
                  {text?.name}{" "}
                </Box>
              </ListItemButton>
            </NavLink>
          )
        )}
        {/* {userDetails.isAdmin == true ?
          <ListItem >
            <ListItemButton
              onClick={() => {
                navigation('/users')
                handleDrawerToggle(false)
              }}
              selected={location.pathname == '/users'}
            >
              <ListItemIcon><PeopleIcon sx={{ color: "white" }} /></ListItemIcon>
              <Box className="sub-heading-fonts text-white text-[18px] pl-0">Users </Box>
            </ListItemButton>
          </ListItem>
          : <></>} */}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document?.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      {!checkUrlEndPoint?.includes("/viewproject") ? (
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            position: "relative",
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
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
                backgroundColor: "#34d399",
                borderRadius: "0px 40px 40px 0px",
                boxShadow: "10px 10px 20px -10px rgba(0,0,0,0.95)",
              },
            }}
          >
            {drawer}
            <ListItemButton
              onClick={() => {
                localStorage.clear();
                navigation("/");
              }}
              sx={{ position: "absolute", bottom: 10 }}
            >
              <ListItemIcon>
                <LogoutIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <Box className="sub-heading-fonts text-white">Logout</Box>
            </ListItemButton>
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#34d399",
                borderRadius: "0px 40px 40px 0px",
                boxShadow: "10px 10px 20px -10px rgba(0,0,0,0.95)",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      ) : (
        <></>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
        {!role && (
          <div>
            <ChatBox />
          </div>
        )}
      </Box>
    </Box>
  );
}
