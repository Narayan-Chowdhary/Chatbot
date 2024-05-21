import Logo from "../../../assets/images/Logo-removebg.png";
import { React } from "react";
import { useLocation } from "react-router-dom";
import { Box, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

import SendIcon from "@mui/icons-material/Send";
import { blue } from "@mui/material/colors";

export default function ViewChatBot(props) {
  const location = useLocation();

  const { detailsOfSettingForm } = props;
  const dataImportedFromSettingOfChatbot = JSON.parse(location?.state);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "90vw", sm: "60vw", md: "35vw" },
          minHeight: "80vh",
          maxHeight: "80vh",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          p: 1,
          boxShadow: "-12px -8px 40px rgba(70,70,70,0.12) inset;",
        }}
      >
        {" "}
        <Box
          sx={{
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: " center",
            width: "98%",
            backgroundColor: detailsOfSettingForm?.headerColor,
          }}
        >
          {detailsOfSettingForm?.removeBotProfileImage ? null : (
            <Box>
              <Avatar />
            </Box>
          )}
          <img src={Logo} alt="nk" style={{height:"30px"}} />
          <Box>
            <Typography variant="h6">
              {detailsOfSettingForm?.projectName}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            border: "15px",
            height: "100%",
            overflow: "scroll",
            backgroundColor: detailsOfSettingForm?.theme ? "white" : "#1e293b",
          }}
        >
          <Box
            sx={{
              wordBreak: "break-word",
              position: "absolute",
              left: "0px",
              top: "3px",
              backgroundColor: "#7dd3fc",
              width: "auto",
              maxWidth: "50%",
              height: "auto",
              py: "8px",
              px: " 15px",
              borderBottomRightRadius: "15px",
              borderBottomLeftRadius: "15px",
              borderTopRightRadius: "15px",
              margin: "3px 5px",
            }}
          >
            {detailsOfSettingForm?.initialMessage}
          </Box>

          <Box
            sx={{
              wordBreak: "break-word",
              backgroundColor: detailsOfSettingForm?.projectMsgColor,
              position: "absolute",
              right: "0px",
              top: "100px",
              width: "auto",
              maxWidth: "50%",
              height: "auto",
              py: "8px",
              px: " 15px",
              borderBottomRightRadius: "15px",
              borderBottomLeftRadius: "15px",
              borderTopLeftRadius: "15px",
              margin: "3px 5px",
            }}
          >
            Hello
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >

<TextField
            sx={{
              minWidth: "30vw",
              padding: "10px",
            }}
            type="text"
            placeholder="Type a message..."
            InputProps={{
              sx: { borderRadius: "20px", padding: "1px" },
            }}
            size="small"
          />

          <Box
            sx={{
              backgroundColor:
                dataImportedFromSettingOfChatbot
                  ?.dataExportingToSettingOfChatbot?.headerColor,
              padding: "6px",
              borderRadius: "40px",
              width: "42px",
              height: "42px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SendIcon
              sx={{
                color: blue[500],
                fontSize: 25,
                cursor: "pointer",
                "&:hover": {
                  color: blue[300],
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
