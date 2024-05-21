import React from "react";

import { Dialog, DialogActions, Button, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

export default function MainDialogBox({
  openSourceDialogBox,
  setOpenSourceDialogBox,
  Content,
}) {
  const handleClose = () => {
    setOpenSourceDialogBox(false);
  };

  return (
    <Box>
      <Dialog open={openSourceDialogBox} onClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            mt: 2,
            mr: 2,
          }}
        >
          <ClearIcon
            onClick={handleClose}
            sx={{
              border: 2,
              borderRadius: 5,
              cursor: "pointer",
            }}
          />
        </Box>

        {Content}

        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              cursor: "pointer",
            }}
            startIcon={<ClearIcon />}
          >
            Cancel
          </Button>
          <Button
            sx={{
              cursor: "pointer",
            }}
            onClick={handleClose}
            variant="contained"
            autoFocus
            startIcon={<CheckIcon />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
