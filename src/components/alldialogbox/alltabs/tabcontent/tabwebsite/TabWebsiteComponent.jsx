import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
export default function TabWebsiteComponent() {
  return (
    <>
      <Typography variant="h6">Crawl</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 350,
            maxWidth: "100%",
          }}
        >
          <TextField fullWidth placeholder="https://www.example.com/" />
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{
              p: 2,
            }}
          >
            Fetch Link
          </Button>
        </Box>
      </Box>
      <Typography
        variant="outlined"
        sx={{
          fontSize: "13px",
        }}
      >
        This will crawl all the links starting with the URL (not including files
        on the website).
      </Typography>
    </>
  );
}
