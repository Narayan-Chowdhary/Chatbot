import { React, useEffect, useState } from "react";
import {
  DialogTitle,
  Dialog,
  Button,
  Box,
  Divider,
  Paper,
  MobileStepper,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import styled from "styled-components";
import UserForm from "./form";

const styledbutton = styled(Button)`
  &:hover {
    background-color: transparent;
  }
`;

export default function AddUpdateUser(props) {
  const { formOpen, setFormOpen, fetchData, userEditData, setUserEditData } =
    props;
  const [isClick, setIsClick] = useState(false);

  const handleClose = () => {
    setFormOpen(false);
    fetchData();
    setUserEditData({});
  };

  return (
    <>
      <Dialog open={formOpen} onClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pt: 1,
            pr: 1,
            background: "#34d399",
          }}
        >
          <DialogTitle className="heading-fonts text-white text-2xl">
            User Details
          </DialogTitle>
          <HighlightOffIcon
            fontSize="large"
            sx={{ cursor: "pointer", color: "#fff" }}
            onClick={() => {
              handleClose();
            }}
          />
        </Box>

        <Divider />
        <Box
          sx={{
            overflowY: "auto",
            height: "540px",
          }}
          className="w-full sm:w-[320px] md:w-[500px]"
        >
          <Box sx={{ marginTop: 4 }}>
            <UserForm
              handleClose={handleClose}
              isClick={isClick}
              setIsClick={setIsClick}
              userEditData={userEditData}
              setUserEditData={setUserEditData}
            />
          </Box>

          <MobileStepper
            variant=""
            position="static"
            style={{
              margin: 20,
            }}
            nextButton={
              <Button size="small" onClick={() => setIsClick(true)}>
                Submit
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleClose}>
                Cancel
              </Button>
            }
          />
        </Box>
      </Dialog>
    </>
  );
}
