import { React, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { allProjects } from "../../services/projects.service";
import { uploadPDFForData } from "../../services/chatbot.services";
import SettingsPopOver from "../../components/settingspopover";
import PDFDialogBox from "../../components/alldialogbox/pdfdialogbox/pdfDialogBox";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Paper,
  Box,
  Fab,
  Alert,
  Snackbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewBotAdd from "../../components/AddNewProject/Steppertoaddcollection";
import { AppContext } from "../../store/store.context";
import TableLoader from "../../components/TableLoader";

export default function AllChatBots() {
  const collectionTableHeading = ["Projects", "Tags", "Action"];

  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [botNameIndex, setBotNameIndex] = useState();
  const [fileSubmit, setfileSubmit] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showLoader, setShowLoader] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const { projectData, setProjectData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const handleOpenPopup = (botName) => {
    setShowPopup(true);
    setBotNameIndex(botName);
  };

  const handleUploadFile = async (file) => {
    const formData = new FormData();
    formData.append("uploaded_file", file);
    await uploadPDFForData(
      formData,
      botNameIndex.userEndPoint,
      file.name,
      botNameIndex.token
    );
  };

  const handleSubmit = async (event) => {
    setShowLoader(true);
    await handleUploadFile(selectedFile);
    setShowLoader(false);
    fileSubmit && setShowPopup(false);
    fileSubmit &&
      navigate("/viewchatbot", {
        state: JSON.stringify({
          dataExportingToSettingOfChatbot: botNameIndex,
        }),
      });
  };

  const handleFileSelection = async (event) => {
    const selectedFile = event?.target?.files[0];

    if (selectedFile === undefined) {
      return;
    }
    if (selectedFile && selectedFile?.type === "application/pdf") {
      setSelectedFile(selectedFile);
      setfileSubmit(true);
    }
    if (selectedFile?.type !== "application/pdf") {
      setMessage("This is not the desired file format");
      setOpen(true);
      event.target.value = "";
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const fetchData = async () => {
    try {
      const response = await allProjects();
      if (response && response.data) {
        setProjectData(response?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, location, location.pathname]);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("userDetails"));
    setRole(item?.isAdmin ? "admin" : "user");
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target?.value, 10));
    setPage(0);
  };

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  return (
    <>
      {loading && <TableLoader />}

      <NewBotAdd
        formOpen={formOpen}
        setFormOpen={setFormOpen}
        fetchData={fetchData}
      />

      <Box sx={{ marginBottom: "12px" }}>
        {role === "admin" ? (
          <Box
            sx={{
              position: "fixed",
              bottom: 30,
              right: 30,
              borderRadius: "50%",
              backgroundColor: "#34d399",
              zIndex: 1,
            }}
          >
            <Fab color="primary" fontSize="large" onClick={handleFormOpen}>
              <AddIcon />
            </Fab>
          </Box>
        ) : (
          ""
        )}
      </Box>
      <Box>
        <Typography className="2xl:mt-10 mb-4 ml-4 text-3xl">
          Projects
        </Typography>
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          component={Paper}
          className="table_wrapper max-h-[63vh] border border-[#2F96E1]"
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow style={{ backgroundColor: "#34d399", height: "35px" }}>
                {collectionTableHeading?.map((row, index) => (
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textWrap: "nowrap",
                      backgroundColor: "#34d399",
                      color: "white",
                    }}
                    key={index}
                    align="left"
                    className="Heading-Fonts"
                  >
                    {row}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody style={{ maxHeight: "200px", overflow: "auto" }}>
              {(projectData && rowsPerPage > 0
                ? projectData?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : projectData
              ).map((row, index) => (
                <TableRow
                  key={index}
                  className={`${index % 2 ? "bg-[#E3F3FF]" : "bg-white"} `}
                >
                  <TableCell
                    sx={{ textWrap: "nowrap" }}
                    component="th"
                    scope="row"
                  >
                    <Box
                      style={{
                        textDecoration: "none",
                        color: "#2196f3",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        const internalValue = row?.internal;
                        const dataSourceValue = row?.datasource;

                        if (internalValue === true && dataSourceValue === 1) {
                          handleOpenPopup(row);
                        } else {
                          const route = internalValue
                            ? "/viewchatbot"
                            : `/viewproject/${row?.name}`;
                          navigate(route, {
                            state: JSON.stringify({
                              dataExportingToSettingOfChatbot: row,
                            }),
                          });
                        }
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          fontSize: "16px",
                          "&:hover": {
                            textDecoration: "underline",
                            cursor: "pointer",
                          },
                        }}
                      >
                        {/* <Box sx={{ color: blue[500], mr: 2 }}>
                        <SmartToyIcon />
                      </Box> */}
                        <Box className="sub-heading-fonts">
                          {row.name}
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ minWidth: 200 }} component="th" scope="row">
                    {row?.tags?.split(",").join(", ")}
                  </TableCell>
                  {/* <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell> */}
                  <TableCell component="th" scope="row">
                    <SettingsPopOver
                      details={row}
                      names={row?.name}
                      internal={row?.internal}
                      botName={projectData}
                      botNameTableId={row?._id}
                      botNameTableIndex={index}
                      fetchData={fetchData}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          count={projectData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="place-self-center place-self-end w-[10%]"
        />
      </Paper>
      <PDFDialogBox
        showPopup={showPopup}
        close={handleClosePopup}
        submit={handleSubmit}
        file={handleFileSelection}
        showLoader={showLoader}
      />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="info" onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
