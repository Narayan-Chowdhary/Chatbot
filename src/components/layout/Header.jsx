import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, Button, IconButton, InputAdornment, Menu, MenuItem, TextField, Toolbar, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { allDocuments } from "../../services/documents.service";
import { allProjects } from "../../services/projects.service";
import { allUsers } from "../../services/users.service";
import { AppContext } from "../../store/store.context";

export const Header = ({ handleDrawerToggle, drawerWidth }) => {
  const navigation = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const checkUrlEndPoint = location?.pathname;
  const [searchParams, setSearchParams] = useState('')
  const { setProjectData, setDocumentData, setUserData } = useContext(AppContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const userDetail = JSON.parse(localStorage?.getItem("userDetails"))
  const UserFullName = userDetail?.fullName?.trim()?.split(' ')?.filter(wordSpace => wordSpace !== '')
  useEffect(() => {
    const getData = setTimeout(() => {
      if (searchParams !== '') {
        fetchData()
      }
    }, 500)

    return () => clearTimeout(getData)
  }, [searchParams])

  useEffect(() => {
    if (searchParams?.trim()?.length == 0)
      fetchData(true)
  }, [searchParams])

  const heading = useMemo(() => {
    if (location?.pathname == '/projects') {
      return 'Projects'
    } else if (location?.pathname == '/documents') {
      return 'Documents'
    } else if (location?.pathname == '/users') {
      return 'Users'
    } else if (location?.pathname == '/viewchatbot') {
      return 'View Chatbot'
    } else if (location?.pathname.includes('/documents/')) {
      return 'View Document'
    } else if (location?.pathname.includes('/viewproject')) {
      return 'View Project'
    }
  }, [location, location?.pathname])

  const fetchData = async (isClearing = false) => {
    try {
      const search = isClearing == true ? '' : searchParams
      if (location?.pathname == '/projects') {
        const res = await allProjects(search)
        if (res && res?.data) {
          setProjectData(res?.data);
        }
      } else if (location?.pathname == '/documents') {
        const res = await allDocuments(search)
        if (res && res?.data) {
          setDocumentData(res?.data);
        }
      } else if (location?.pathname == '/users') {
        const res = await allUsers(search)
        if (res && res?.data) {
          setUserData(res?.data);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // function handleCopyPassword(event) {
  //   navigator.clipboard.writeText(event.target.innerText)

  //   if (event.target.innerText == userDetail.fullName) {
  //     setCopiedText(true)
  //     setTimeout(() => { setCopiedText(false) }, 2000)
  //   }
  //   else {
  //     setCopiedPass(true)
  //     setTimeout(() => { setCopiedPass(false) }, 2000)
  //   }

  // }
  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#34d399",
          pl: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            bgcolor: "white",
            height: "80px",
            display: "flex",
            backgroundColor: "#34d399",
            justifyContent:
              checkUrlEndPoint === "/viewchatbot" ||
              checkUrlEndPoint?.includes("/viewproject") ||
              checkUrlEndPoint?.includes("/documents/")
                ? "space-between"
                : "space-around",
            [theme?.breakpoints?.up("xs")]: {
              justifyContent: "space-between",
            },
            [theme?.breakpoints.up("sm")]: {
              justifyContent: "space-between",
              alignItems: "center",
            },
          }}
        >
          <Box
            className="header_leftwrapper"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {(checkUrlEndPoint === "/viewchatbot" ||
              checkUrlEndPoint?.includes("/viewproject") ||
              checkUrlEndPoint?.includes("/support/")) && (
              <Button
                sx={{ mr: 2, textWrap: "nowrap", color: "white" }}
                onClick={() => {
                  navigation(-1);
                }}
                variant="text"
              >
                <ChevronLeftIcon />
                Go Back
              </Button>
            )}

            <Box>
              <Typography className="w-[100px] sm:w-[140px] md:w-[150px] lg:w-full lg:ml-6 text-[12px] sm:text-[16px] md:text-[14px] lg:text-[18px] xl:text-[24px]">
                Welcome,
                <span className="font-bold">
                  {" "}
                  {userDetail?.fullName?.split(" ")[0]}
                </span>
              </Typography>
            </Box>
            {/* <Box className="pl-6 relative">
              <LockOpenIcon onClick={() => setShowPassword(!showPassword)} />
              {showPassword &&
                <div className="h-24 w-80 bg-white absolute top-10 border-2 border-red-400 text-[#34d399] rounded-lg ">
                  <div className="px-2 pt-2  flex ">
                    <AccountCircleIcon sx={{ color: 'black', marginRight: 2 }} fontSize="large" />
                    <Typography onClick={handleCopyPassword}>{userDetail.fullName}  {copiedText && <span className="px-1 bg-green-300">Copied</span>}</Typography>
                  </div>
                  <div className="px-2 pt-2 flex ">
                    <KeyIcon sx={{ color: 'black', marginRight: 2 }} fontSize="large" />
                    <Typography onClick={handleCopyPassword}>{userDetail.email} {copiedPass && <span className="px-1 bg-green-300">Copied</span>}</Typography>
                  </div>

                </div>
              }
            </Box> */}
          </Box>

          <div
            style={{
              display: "flex",
              cursor: "pointer",
              width: 450,
              justifyContent: "flex-end",
              marginRight: 8,
            }}
          >
            {checkUrlEndPoint == "/projects" ||
            checkUrlEndPoint == "/documents" ? (
              <Box className="my-auto">
                <TextField
                  className="search_header mr-3 md:mr-2 lg:mr-6 xl:mr-12"
                  id="outlined-basic"
                  placeholder="Search..."
                  variant="outlined"
                  value={searchParams}
                  size="small"
                  sx={{
                    width: "328px",
                    color: "#bebfc4",
                    bgcolor: "white",
                    borderRadius: "10px",
                  }}
                  onChange={(e) => {
                    setSearchParams(e?.target?.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setSearchParams("");
                            fetchData(true);
                          }}
                          edge="end"
                        >
                          {searchParams?.trim()?.length > 0 ? (
                            <CloseIcon />
                          ) : (
                            <SearchIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            ) : (
              <></>
            )}
            <div className="profile_wrapper ">
              <div
                onClick={handleClick}
                variant="contained"
                style={{ display: "flex", cursor: "pointer" }}
              >
                <p
                  style={{
                    borderRadius: 30,
                    border: 1,
                    borderColor: "red",
                    background: "#98C93C",
                    width: 40,
                    height: 40,
                    margin: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* {`${UserFullName[0][0]?.toUpperCase()}${
                    UserFullName?.length > 1
                      ? UserFullName[1][0]?.toUpperCase()
                      : ""
                  }`} */}
                </p>
                <KeyboardArrowDownIcon
                  sx={{ color: grey[400], margin: "auto", marginLeft: 1 }}
                />
              </div>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                style={{ minWidth: 200 }}
              >
                <MenuItem
                  onClick={() => {
                    localStorage?.clear();
                    navigation("/");
                  }}
                  variant="text"
                  style={{ minWidth: 200 }}
                >
                  <LogoutIcon sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </div>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { sm: "none" },
              color: "#64748b",
              border: "2px solid",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}