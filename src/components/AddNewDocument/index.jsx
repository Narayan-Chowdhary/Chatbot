import { React, useState } from "react";
import {
  DialogTitle,
  Dialog,
  Button,
  Box,
  Divider,
  MobileStepper,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import styled from "styled-components";
import DocumentForm from "./form";

const styledbutton = styled(Button)`
  &:hover {
    background-color: transparent;
  }
`;

export default function AddNewDocument(props) {
  const { formOpen, setFormOpen, fetchData } = props;
  const [isClick, setIsClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setIsLoading(false);
    setFormOpen(false);
    fetchData();
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
            Add New Document
          </DialogTitle>
          <HighlightOffIcon
            fontSize="large"
            sx={{ cursor: "pointer", color: "#fff" }}
            onClick={() => {
              setFormOpen(false);
            }}
          />
        </Box>

        <Divider />
        <Box
          sx={{
            height: "540px",
            overflowY: "auto",
            position: "relative",
          }}
          className="w-full sm:w-[320px] md:w-[500px]"
        >
          <Box sx={{ marginTop: 4 }}>
            <DocumentForm
              handleClose={handleClose}
              isClick={isClick}
              setIsClick={setIsClick}
              setIsLoading={setIsLoading}
            />
          </Box>

          <MobileStepper
            variant=""
            style={{
              margin: 20,
              position: "absolute",
              bottom: 10,
            }}
            nextButton={
              <Button
                size="small"
                disabled={isLoading}
                onClick={() => {
                  setIsClick(true);
                  setIsLoading(true);
                }}
              >
                Submit
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleClose} disabled={isLoading}>
                Cancel
              </Button>
            }
          />
        </Box>
      </Dialog>
    </>
  );
}
