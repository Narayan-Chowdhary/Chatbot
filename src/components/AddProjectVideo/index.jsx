import { React, useState, useEffect, useContext } from "react";
import {
  DialogTitle,
  Dialog,
  Button,
  Box,
  Divider,
  Grid,
  TextField,
  Input,
  MobileStepper,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { allProjectList } from "../../services/projects.service";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { AppContext } from "../../store/store.context";

export default function AddProjectVideo(props) {
  const { formOpen, setFormOpen, fetchData } = props;
  const {
    setShowFileUploadInProgress,
    handleVideoUpload,
    videoUploadProgress,
  } = useContext(AppContext);
  const [selectedProject, setSelectedProject] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [projectOptions, setProjectOptions] = useState([]);
  const [title, setTitle] = useState("");
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [titleError, setTitleError] = useState("");
  const [projectError, setProjectError] = useState("");
  const [fileError, setFileError] = useState("");
  const formData = new FormData();
  const handleClose = () => {
    setFormOpen(false);
  };

  const handleSubmit = async () => {
    setProjectError("");
    setTitleError("");
    setFileError("");
    const fileInput = document.getElementById("fileInput");

    if (
      title == "" ||
      selectedProject == undefined ||
      fileInput?.files?.length == 0
    ) {
      if (title == "") setTitleError("Title is required");
      if (selectedProject == undefined) setProjectError("Project is required");
      if (fileInput?.files?.length == 0) setFileError("File is required");
    } else {
      formData.append("projectId", selectedProject?._id || "");
      formData.append("title", title);
      if (fileInput?.files && fileInput?.files?.length > 0) {
        formData.append("file", fileInput?.files[0]);
      }
      const data = {
        title: title,
      };
      setFormOpen(false);
      fetchData();
      const resp = await handleVideoUpload(formData, data);
      if (resp?.status == 200) {
        fetchData();

        setTitle("");
        setSelectedProject();
      }
    }
  };

  const handleFileSelection = (event) => {
    setSelectedVideo(event?.target?.files[0]);
  };

  const fetchProjectOption = async () => {
    const res = await allProjectList();
    if (res && res?.data) {
      setProjectOptions(res?.data);
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchProjectOption();
  }, []);

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
            Add New Project Video
          </DialogTitle>
          <Box onClick={handleClose} className="w-10 h-10 cursor-pointer mt-1">
            <HighlightOffIcon fontSize="large" sx={{ color: "#fff" }} />
          </Box>
        </Box>

        <Divider />
        <Box
          sx={{
            overflowY: "auto",
            height: "540px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          className="w-full sm:w-[320px] md:w-[500px]"
        >
          <form>
            <Box>
              <Grid container rowSpacing={5} sx={{ px: 5 }}>
                {!loadingProjects ? (
                  <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
                    <Autocomplete
                      value={selectedProject}
                      onChange={(event, newValue) => {
                        setSelectedProject(newValue);
                      }}
                      id="setSelectedProject"
                      isOptionEqualToValue={(option, value) =>
                        option?.projectName === value?.projectName
                      }
                      options={projectOptions}
                      getOptionLabel={(option) => option?.projectName}
                      filterSelectedOptions
                      sx={{ width: "100%", borderRadius: "10px" }}
                      renderInput={(params) => (
                        <>
                          <TextField
                            {...params}
                            label="Select Projects"
                            helperText={projectError ? projectError : ""}
                            error={projectError ? projectError : ""}
                            touched={projectError}
                          />
                        </>
                      )}
                    />
                  </Grid>
                ) : (
                  <></>
                )}
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    variant="standard"
                    label="Enter Tiitle"
                    fullWidth
                    type="text"
                    name="title"
                    value={title}
                    helperText={titleError ? titleError : ""}
                    error={titleError ? titleError : ""}
                    touched={titleError}
                    InputProps={{
                      sx: {
                        borderRadius: "10px",
                      },
                    }}
                    onChange={(e) => setTitle(e?.target?.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <input
                    type="file"
                    onChange={handleFileSelection}
                    id="fileInput"
                  />
                  {fileError ? (
                    <p style={{ fontSize: 12, color: "red" }}>{fileError}</p>
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
              <MobileStepper
                variant=""
                style={{
                  margin: 20,
                  position: "absolute",
                  bottom: 10,
                }}
                nextButton={
                  <Button size="small" onClick={handleSubmit}>
                    Save
                  </Button>
                }
                backButton={
                  <Button size="small" onClick={handleClose}>
                    Cancel
                  </Button>
                }
              />
            </Box>
          </form>
          <Box sx={{ height: "auto", width: "100%", pb: 3 }}></Box>
        </Box>
      </Dialog>
    </>
  );
}
