import "./RadioButton.css";
import { React, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  DialogTitle,
  Dialog,
  Button,
  Box,
  Typography,
  MobileStepper,
  Paper,
  Divider,
} from "@mui/material";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import styled from "styled-components";
import ExternalProjectAdd from "../externalproject";
import InteranlChatBot from "../internalchatbot";
import UserImg from "../../../assets/images/UserImg.png";

const styledbutton = styled(Button)`
  &:hover {
    background-color: transparent;
  }
`;

export default function NewBotAdd(props) {
  const [isClick, setIsClick] = useState(false);
  const steps = [{ label: "Project Type" }, { label: "Add Details" }];
  const { formOpen, setFormOpen, fetchData } = props;
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState(0);
  const maxSteps = steps.length;

  const handleClose = () => {
    setFormOpen(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setForm(0);
  };

  const handleFinish = () => {
    setIsClick(true);
  };

  return (
    <div className="">
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
          className=" "
        >
          <DialogTitle className="heading-fonts text-white text-2xl">
            Add New Collection
          </DialogTitle>
          <HighlightOffIcon
            fontSize="large"
            sx={{ cursor: "pointer", color: "#fff" }}
            onClick={() => {
              setFormOpen(false);
              setActiveStep(0);
              setForm(0);
            }}
          />
        </Box>

        <Divider />
        <Box
          sx={{
            height: "540px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          className="w-full sm:w-[320px] md:w-[500px]"
        >
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              height: 50,
              bgcolor: "background.default",
            }}
          >
            <DialogTitle className="sub-heading-fonts">
              {steps[activeStep]?.label}
            </DialogTitle>
          </Paper>
          <Box sx={{ height: "auto", width: "100%", pb: 3 }}>
            {activeStep === steps?.length - 1 ? (
              <Box>
                {form === 1 ? (
                  <Box>
                    <InteranlChatBot
                      fetchData={fetchData}
                      handleClose={handleClose}
                      form={form}
                      isClick={isClick}
                      setIsClick={() => {
                        setIsClick(false);
                      }}
                      handleFinish={handleFinish}
                      setActiveStep={setActiveStep}
                      setFormOpen={setFormOpen}
                    />
                  </Box>
                ) : (
                  <Box>
                    <ExternalProjectAdd
                      fetchData={fetchData}
                      handleClose={handleClose}
                      form={form}
                      isClick={isClick}
                      setIsClick={() => {
                        setIsClick(false);
                      }}
                      handleFinish={handleFinish}
                      setActiveStep={setActiveStep}
                      setFormOpen={setFormOpen}
                    />
                  </Box>
                )}
              </Box>
            ) : (
              <Box className="">
                <Box
                  className=""
                  sx={{
                    py: 2,
                  }}
                >
                  <Box className="flex justify-center">
                    <img src={UserImg} alt="user-img" width={200} />
                  </Box>
                  <Typography
                    sx={{
                      textAlign: "center",
                      pb: 2,
                    }}
                    className="sub-heading-fonts"
                  >
                    Choose an Project type
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box className="radio-toolbar">
                      <input
                        type="radio"
                        id="radio2"
                        name="radios"
                        value="false"
                        onClick={() => {
                          handleNext();
                          setForm(1);
                        }}
                      />
                      <label for="radio2">Chat Bot</label>
                    </Box>
                    <Box className="radio-toolbar">
                      <input
                        type="radio"
                        id="radio3"
                        name="radios"
                        value="true"
                        onClick={() => {
                          handleNext();
                          setForm(2);
                        }}
                      />
                      <label for="radio3">Project</label>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={
                  activeStep === maxSteps - 1 ? handleFinish : handleNext
                }
                disabled={form === 0}
              >
                {activeStep === maxSteps - 1 ? "Finish" : "Next"}
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme?.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      </Dialog>
    </div>
  );
}
