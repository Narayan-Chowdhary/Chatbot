import React from "react";
import ResetButton from "../../common/resetbutton";
import InputTypeColor from "../../common/inputcolortype";
import StaticViewChatBotDesign from "../staticviewchatbotdesign";

import {
  Box,
  Typography,
  TextField,
  Grid,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

export default function ChatInterFaceSettings(props) {
  const {
    detailsOfSettingForm,
    setDetailsOfSettingForm,
    dataImportedFromSettings,
  } = props;

  const handleChange = (event) => {
    setDetailsOfSettingForm((prevState) => {
      return {
        ...prevState,
        [event?.target?.name]: event?.target?.value,
      };
    });
  };

  const hanleColorChange = (color, identifier) => {
    setDetailsOfSettingForm((prevState) => ({
      ...prevState,
      [identifier]: color,
    }));
  };

  const handleCheckBox = (event) => {
    setDetailsOfSettingForm((prevState) => {
      return {
        ...prevState,
        [event?.target?.name]: event?.target?.checked,
      };
    });
  };

  return (
    <>
      <Box>
        <Box>
          <Typography variant="h5">
            <strong>Chat Interface</strong>
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption">
            applies when embedded on a website
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <ResetButton
                id={detailsOfSettingForm?.id}
                detailsOfSettingForm={detailsOfSettingForm}
                setDetailsOfSettingForm={setDetailsOfSettingForm}
                lableName={"initialMessage"}
                lableNameSec={"suggestedMessage"}
              />
            </Box>

            <Box>
              <Typography variant="button">initial message</Typography>
            </Box>
            <Box>
              <TextField
                name="initialMessage"
                value={detailsOfSettingForm?.initialMessage}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  sx: {
                    borderRadius: "10px",
                  },
                }}
              />
            </Box>
            <Box>
              <Typography variant="caption">
                Enter each message in a new line.
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Box>
                <Typography>Suggested Message</Typography>
              </Box>
              <Box>
                <TextField
                  name="suggestedMessage"
                  value={detailsOfSettingForm?.suggestedMessage}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                  InputProps={{
                    sx: {
                      borderRadius: "10px",
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography variant="caption">
                  Enter each message in a new line.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Box>
                <Typography>Theme</Typography>
                <FormControl fullWidth>
                  <Select
                    name="theme"
                    value={detailsOfSettingForm?.theme}
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Light</MenuItem>
                    <MenuItem value={0}>Dark</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography>Header Color</Typography>
                  <InputTypeColor
                    id="headerColor"
                    color={['headerColor', detailsOfSettingForm?.headerColor]}
                    identifier="headerColor"
                    onColorChange={hanleColorChange}
                  />
                </Box>
                <Box>
                  <ResetButton
                    lableName="headerColor"
                    setDetailsOfSettingForm={setDetailsOfSettingForm}
                    detailsOfSettingForm={detailsOfSettingForm}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="button">
                Update chatbot profile picture
              </Typography>
              <Box>
                <input type="file" />
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Box>
                <Typography>Remove chatbot profile picture </Typography>
              </Box>
              <Box>
                <input
                  name="removeBotProfileImage"
                  type="checkbox"
                  onChange={handleCheckBox}
                  checked={
                    detailsOfSettingForm?.removeBotProfileImage ? true : false
                  }
                />
              </Box>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Box>
                <Typography>Display Name</Typography>
              </Box>
              <Box>
                <TextField
                  name="projectName"
                  value={detailsOfSettingForm?.projectName}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    sx: {
                      borderRadius: "10px",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  mt: 2,
                }}
              >
                <ResetButton
                  lableName="projectMsgColor"
                  setDetailsOfSettingForm={setDetailsOfSettingForm}
                  detailsOfSettingForm={detailsOfSettingForm}
                />
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Box>
                <Typography>User Message Color</Typography>
              </Box>
              <Box>
                <InputTypeColor
                  id="projectMsgColor"
                  color={['projectMsgColor', detailsOfSettingForm?.projectMsgColor]}
                  identifier="projectMsgColor"
                  onColorChange={hanleColorChange}
                />
              </Box>
              <Box>
                <Typography variant="caption">
                  **If the changes here don't show up immediately on your
                  website try clearing your browser cache or use incognito. (New
                  users will see the changes immediately)**
                </Typography>
              </Box>
            </Box>

            {detailsOfSettingForm?.removeChatIcon ? null : (
              <Box sx={{ mt: 2 }}>
                <Typography variant="button">
                  Update chatbot profile picture
                </Typography>
                <Box>
                  <input type="file" />
                </Box>
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              {" "}
              <Box>
                <Typography>Remove Chat Icon</Typography>
              </Box>
              <Box>
                <input
                  type="checkbox"
                  name="removeChatIcon"
                  onChange={handleCheckBox}
                  checked={detailsOfSettingForm?.removeChatIcon ? true : false}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Box>
                <Box>
                  <Typography>Chat Bubble Button Color</Typography>
                </Box>
                <Box>
                  <InputTypeColor
                    id="projectBubbleColor"
                    identifier="projectBubbleColor"
                    onColorChange={hanleColorChange}
                    color={['projectBubbleColor', detailsOfSettingForm?.projectBubbleColor]}
                  />
                </Box>
              </Box>
              <Box>
                <ResetButton
                  lableName="projectBubbleColor"
                  setDetailsOfSettingForm={setDetailsOfSettingForm}
                  detailsOfSettingForm={detailsOfSettingForm}
                />
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Box>
                <Typography>Align Chat Bubble Button</Typography>
              </Box>
              <Box>
                {" "}
                <FormControl fullWidth>
                  <Select
                    name="alignProjectBubbleButtonColor"
                    value={detailsOfSettingForm?.alignProjectBubbleButtonColor}
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Left</MenuItem>
                    <MenuItem value={20}>Right</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <StaticViewChatBotDesign
              dataImportedFromSettings={dataImportedFromSettings}
              detailsOfSettingForm={detailsOfSettingForm}
              setDetailsOfSettingForm={setDetailsOfSettingForm}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
