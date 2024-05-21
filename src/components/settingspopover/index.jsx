import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainDialogBox from "../alldialogbox/maindialogbox/MainDialogBox";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingIcon from '../../assets/images/setting-icon.png'
// import DeleteIcon from '@mui/icons-material/Delete';
// import DeleteIcon2 from '../../assets/images/DeleteIcon.png'
import DeleteIcon from '@mui/icons-material/Delete';

import PersonIcon from "@mui/icons-material/Person";

import { Typography, Popover, Box } from "@mui/material";
import { blue } from "@mui/material/colors";
import DeletePopUp from "../common/DeletePopUp";
import { deleteProject } from "../../services/projects.service";

export default function SettingsPopOver(props) {
  const botname = props?.botName;
  const botNameTableId = props?.botNameTableId;
  const botNameTableIndex = props?.botNameTableIndex;
  const names = props?.names

  const navigation = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isRotated, setIsRotated] = useState(false);
  const [openSourceDialogBox, setOpenSourceDialogBox] = useState(false);
  const [currentDialog, setCurrentDialog] = useState();
  const [settings, SetSettings] = useState([])
  const [deletePopUpOpen, setDeletePopUpOpen] = useState(false)
  const [role, setRole] = useState('')

  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
    setIsRotated(!isRotated);
   
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsRotated(!isRotated);

  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;


  useEffect(() => {
    const user = JSON.parse(localStorage?.getItem("userDetails"))
    setRole(user?.isAdmin ? 'admin' : 'user')
  }, []);

  const settingsMenu = [
    {
      id: 1,
      icon: <PersonIcon />,
      name: names,
      link: "viewchatbot",
    },
    {
      id: 2,
      icon: <SettingsIcon />,
      name: "Settings",
      link: "settings",
    }

  ];

  const handleProjectDelete = async () => {
    const res = await deleteProject(botNameTableId)
    setDeletePopUpOpen(false)
    props.fetchData()
    setIsRotated(false);

  }

  useEffect(() => {
    SetSettings(settingsMenu?.filter((e) => {
      return e !== false
    }))
  }, [])

  return (
    <div>
      {!props?.internal && role === 'user' ?
        <SettingsIcon
          sx={{
            color: "grey",
          }}
        /> :
        <SettingsIcon
          onClick={handleClick}
          sx={{
            color: blue[800],
            transform: isRotated ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            cursor: "pointer",
          }}
        />
      }

      <DeletePopUp
        heading="Delete Project"
        text={`Are you sure you want to delete ${names || ''}`}
        showOpen={deletePopUpOpen}
        cancelCallback={setDeletePopUpOpen}
        confirmCallback={handleProjectDelete}
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {props?.internal && settings?.map((menuItem, index) => (
          <Box key={index}>
            <Box
              onClick={() => {
                if (menuItem?.link) {
                  navigation(`${menuItem?.link}`, {
                    state: JSON.stringify({
                      dataExportingToSettingOfChatbot:
                        botname[botNameTableIndex],
                    }),
                  });
                }
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                px: 3,
                pb: 1,
                cursor: "pointer",
                "&:hover": {
                  color: blue[800],
                  backgroundColor: "#e7e5e4",
                },
              }}
            >
              <Typography sx={{ pt: 1, pr: 2 }}> {menuItem?.icon} </Typography>
              <Typography
                sx={{
                  pt: "10px",
                  color: "black",
                }}
              >
                {menuItem?.name}
              </Typography>
            </Box>
          </Box>
        ))
        }
        {role === 'admin' && <Box
          onClick={() => {setDeletePopUpOpen(true); handleClose()} }
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            px: 3,
            pb: 1,
            cursor: "pointer",
            "&:hover": {
              color: blue[800],
              backgroundColor: "#e7e5e4",
            },
          }}>
          <Typography sx={{ pt: 1, pr: 2 }}>
            <DeleteIcon
              sx={{
                cursor: "pointer",
              }}
            />
          </Typography>
          <Typography
            sx={{
              pt: "10px",
              color: "black",
            }}
          >
            Delete
          </Typography>


        </Box>
        }
      </Popover>
      {
        openSourceDialogBox && (
          <MainDialogBox
            setOpenSourceDialogBox={setOpenSourceDialogBox}
            openSourceDialogBox={openSourceDialogBox}
            Content={currentDialog}
          />
        )
      }
    </div >
  );
}
