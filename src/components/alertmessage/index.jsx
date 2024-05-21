import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

export default function AlertMessage({ text, status, isActive, setActive }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setActive(!isActive);
  };

  return (
    <>
      <Snackbar
        open={isActive}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={handleClose}
        sx={{
          justifyContent: "center",
          textTransform: "uppercase",
        }}
        className="mx-auto w-fit lg:w-[30%] lg:h-[20%]"
      >
        <Alert onClose={handleClose} severity={status} sx={{ width: "100%" }}>
          {text}
        </Alert>
      </Snackbar>
    </>
  );
}
