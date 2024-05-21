import { React, useState } from "react";
import { Box, TextField, Typography, Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { blue, red } from "@mui/material/colors";

export default function TabFilesContent() {
  const [imageName, setImageName] = useState();
  const [showRemoveIcon, setShowRemoveIcon] = useState(false);

  const handleInputFileUpload = (event) => {
    setImageName(event.target.files[0].name);
    setShowRemoveIcon(true);
  };

  const handleRemoveFile = () => {
    setImageName(null);
    setShowRemoveIcon(false);
  };
  return (
    <>
      <Box
        sx={{
          border: "1px solid gray",
          p: 2,
          mx: 3,
          mt: 5,
          borderRadius: "15px",
        }}
      >
        <Box>
          <Box
            sx={{
              position: "relative",
            }}
          >
            <TextField
              onChange={(e) => handleInputFileUpload(e)}
              fullWidth
              type="file"
              sx={{
                zIndex: "1",
                opacity: 0,
                cursor: "pointer",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "-10px",
              }}
            >
              <CloudUploadIcon sx={{ color: blue[500], fontSize: 80 }} />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            my: 2,
          }}
        >
          <Box>{imageName} </Box>
          <Box>
            {showRemoveIcon ? (
              <HighlightOffIcon
                onClick={handleRemoveFile}
                sx={{ color: red[500], fontSize: 40 }}
              />
            ) : (
              ""
            )}
          </Box>
        </Box>
        <Divider
          sx={{
            pb: 2,
          }}
        />
        <Box>
          <Typography variant="h5" align="center">
            Drag and Drop Files Here
          </Typography>
        </Box>
      </Box>
    </>
  );
}
