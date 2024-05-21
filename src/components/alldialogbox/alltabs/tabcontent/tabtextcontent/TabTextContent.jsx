import React from "react";
import { Box, TextField } from "@mui/material";

export default function TabTextContent() {
  return (
    <>
      <Box>
        <TextField fullWidth multiline rows={10} />
      </Box>
    </>
  );
}
