import React from "react";
import { Box, Typography } from "@mui/material";

export default function ShareDialog() {
  return (
    <>
      <Box
        height={300}
        width={600}
        sx={{
          py: 4,
          px: 5,
        }}
      >
        <Box>
          <Box>
            <Typography
              variant="h5"
              sx={{
                pb: 2,
              }}
            >
              Share your chatbot
            </Typography>
          </Box>
          <Typography>Use this link to access the chatbot</Typography>
          <Box
            sx={{
              my: 2,
              p: 2,
              fontSize: "15px",
              backgroundColor: "#d4d4d8",
            }}
          >
            {`${window?.location?.href}`}
          </Box>
        </Box>
      </Box>
    </>
  );
}
