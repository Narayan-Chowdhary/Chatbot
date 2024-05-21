import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import ChatInterFaceSettings from "../../components/chatbotinterfacesettings/chatinterfacesettings";
import { update } from '../../services/projects.service'
import AlertMessage from "../../components/alertmessage";

export default function Settings() {
  const location = useLocation();
    const navigate = useNavigate();


  const dataImportedFromSettingOfChatbot = JSON.parse(location.state);
  const [error, setError] = useState(false);
  const setForm = useCallback(
    (reset = false) => {
      const keys = [
        "id",
        "projectName",
        "basePrompt",
        "model",
        "visibility",
        "domain",
        "initialMessage",
        "suggestedMessage",
        "theme",
        "file",
        "removeBotProfileImage",
        "headerColor",
        "projectMsgColor",
        "projectBubbleColor",
        "removeChatIcon",
        "alignProjectBubbleButtonColor",
      ];

      const form = {};

      for (let idx = 0; idx < keys?.length; idx++) {
        if (keys[idx] === "id") {
          form[keys[idx]] =
            dataImportedFromSettingOfChatbot?.dataExportingToSettingOfChatbot?.id;
        } else {
          form[keys[idx]] =
            reset === true
              ? ""
              : dataImportedFromSettingOfChatbot
                  ?.dataExportingToSettingOfChatbot[keys[idx]];
        }
      }

      return form;
    },
    [dataImportedFromSettingOfChatbot?.dataExportingToSettingOfChatbot]
  );

  const [detailsOfSettingForm, setDetailsOfSettingForm] = useState(
    setForm(true)
  );

  useEffect(() => {
    setDetailsOfSettingForm(JSON.parse(JSON.stringify(setForm())));
    // eslint-disable-next-line 
  }, []);

  const handleUpdation = (e) => {
    setDetailsOfSettingForm((prevState) => {
      return {
        ...prevState,
        [e?.target?.name]: e?.target?.value,
      };
    });
  };

  const handleSaveDetails = async () => {
    try {
      const res = await update(detailsOfSettingForm, dataImportedFromSettingOfChatbot?.dataExportingToSettingOfChatbot?._id)
      setError(true);
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          px: { xs: 2, sm: 5, md: 10 },
        }}
      >
        <Box
          sx={{
            pb: 2,
          }}
        >
          <Box>Chatbot ID</Box>
          <Box>
            {
              dataImportedFromSettingOfChatbot?.dataExportingToSettingOfChatbot
                ?.id
            }
          </Box>
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              position: "fixed",
              bottom: 20,
              right: 245,
              zIndex: 1,
            }}
          onClick={() => navigate("/projects")}
          >
            Back
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "green",
              position: "fixed",
              bottom: 20,
              bottom: 20,
              right: 80,
              zIndex: 1,
            }}
            onClick={handleSaveDetails}
          >
            Save Changes
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box>
              <Typography>Name</Typography>
              <TextField
                name="projectName"
                fullWidth
                onChange={handleUpdation}
                value={detailsOfSettingForm?.projectName}
                InputProps={{
                  sx: {
                    borderRadius: "10px",
                    height: "45px",
                  },
                }}
              />
            </Box>
          </Grid>
          {/* <Grid item xs={12}>
            <Box>
              <Typography>Base Prompt (system message)</Typography>
              <TextField
                name="basePrompt"
                onChange={handleUpdation}
                fullWidth
                value={detailsOfSettingForm.basePrompt}
                placeholder="Your Message"
                multiline
                rows={3}
                InputProps={{
                  sx: {
                    borderRadius: "10px",
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                mt: 2,
              }}
            >
              <ResetButton
                id={
                  dataImportedFromSettingOfChatbot
                    .dataExportingToSettingOfChatbot.id
                }
                lableName={"basePrompt"}
                setDetailsOfSettingForm={setDetailsOfSettingForm}
                detailsOfSettingForm={detailsOfSettingForm}
              />
            </Box>
          </Grid> */}
          {/* <Grid item xs={12}>
            <Box>
              <Typography>Model</Typography>
              <TextField
                name="model"
                onChange={handleUpdation}
                value={detailsOfSettingForm.model}
                fullWidth
                placeholder="model name"
                InputProps={{
                  sx: {
                    borderRadius: "10px",
                    height: "45px",
                  },
                }}
              />
              <Typography variant="caption">
                1 message using gpt-3.5-turbo costs 1 message credit. 1 message
                using gpt-4 costs 20 message credits.
              </Typography>
            </Box>
          </Grid> */}
          {/* <Grid item xs={12}>
            <Box>
              <Typography>Visibility</Typography>
              <FormControl fullWidth>
                <Select
                  name="visibility"
                  value={detailsOfSettingForm.visibility}
                  onChange={handleUpdation}
                  displayEmpty
                >
                  <MenuItem value={30}>public </MenuItem>
                  <MenuItem value={10}>private</MenuItem>
                  <MenuItem value={20}>
                    Private but can be embedded on website
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid> */}
          {/* <Grid item xs={12}>
            <Typography variant="caption">
              Private: No one can access your chatbot except you (your account){" "}
            </Typography>{" "}
            <br />
            <Typography variant="caption">
              Private but can be embedded on website: Other people can't access
              your chatbot if you send them the link, but you can still embed it
              on your website and your website visitors will be able to use it.
              (make sure to set your domains){" "}
            </Typography>
            <br />
            <Typography variant="caption">
              Public: Anyone with the link can access it on chatbase.co and can
              be embedded on your website.
            </Typography>{" "}
            <br />
            <Typography variant="caption">
              Set to public if you want to be able to send a link of your
              chatbot to someone to try it.
            </Typography>
          </Grid> */}

          {/* <Grid item xs={12}>
            <Box>
              <Typography>Domains</Typography>
              <TextField
                name="domain"
                onChange={handleUpdation}
                value={detailsOfSettingForm.domain}
                placeholder="example.com"
                InputProps={{
                  sx: {
                    borderRadius: "10px",
                  },
                }}
              />
              <Box>
                <Typography variant="caption">
                  Enter each domain in a new line
                </Typography>
                <br />
                <Typography variant="caption">
                  Domains you want to embed your chatbot on. Your chatbot
                  visibility has to be Public or Private but can be embedded on
                  website for this to work.
                </Typography>
                <br />
              </Box>
            </Box>
          </Grid> */}
          <Grid item xs={12}>
            <ChatInterFaceSettings
              dataImportedFromSettings={
                dataImportedFromSettingOfChatbot?.dataExportingToSettingOfChatbot
              }
              detailsOfSettingForm={detailsOfSettingForm}
              setDetailsOfSettingForm={setDetailsOfSettingForm}
            />
          </Grid>
        </Grid>
      </Box>
      <AlertMessage
        text="Details Updated"
        status="success"
        isActive={error}
        setActive={setError}
      />
    </>
  );
}
