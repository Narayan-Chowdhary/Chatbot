import { Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Box,
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { React, useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AddProjectVideo from "../../components/AddProjectVideo";
import TableLoader from "../../components/TableLoader";
import { allVideos, deleteVideo } from "../../services/videos.service";
import { AppContext } from "../../store/store.context";
import { base_url } from "../../utils/_data/ApiEndPoints";
import DeletePopUp from "../../components/common/DeletePopUp";
import VideoPopUp from "../../components/common/VideoPopUp";
import { allProjects } from "../../services/projects.service";

export default function Videos() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formOpen, setFormOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [userEditData, setUserEditData] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "");
  const { videoData, setVideoData } = useContext(AppContext);
  const [active, setActive] = useState(null);
  const [deletePopUpOpen, setDeletePopUpOpen] = useState(false);
  const [videoPopUpOpen, setVideoPopUpOpen] = useState(false);
  const [videoPath, setVideoPath] = useState();

  const [videoName, setVideoName] = useState("");
  const [videoId, setVideoId] = useState();
  const [loading, setLoading] = useState(true);

  const userTableHeading = userDetails?.isAdmin
    ? ["Project Name", "Number of videos"]
    : ["Project Name", "Number of videos"];

  const fetchData = async () => {
    try {
      const response = await allVideos();
      if (response && response?.data) {
        if (!userDetails?.isAdmin) {
          try {
            const projectResponse = await allProjects();
            if (projectResponse && projectResponse?.data) {
              const newVideoData = response?.data?.filter((obj1) =>
                projectResponse?.data?.some((obj2) => obj2?._id === obj1?._id)
              );
              setVideoData(newVideoData);
              setLoading(false);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        } else {
          setVideoData(response?.data);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect(() => {
  //   if (!userDetails.isAdmin) {
  //     navigate("/projects");
  //   }
  // }, []);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, location, location.pathname]);

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

  const handleProjectToggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  const handleProjectDelete = async () => {
    const res = await deleteVideo(videoId);
    setDeletePopUpOpen(false);
    fetchData();
  };

  const handleVideoPlay = (videoURL) => {
    setVideoPopUpOpen(true);
    setVideoPath(
      `${base_url}${videoURL?.pathName?.substring(
        videoURL?.pathName?.indexOf("/public") + "/public"?.length
      )}`
    );
  };

  return (
    <>
      {loading && <TableLoader />}
      <AddProjectVideo
        formOpen={formOpen}
        setFormOpen={setFormOpen}
        fetchData={fetchData}
        userEditData={userEditData}
        setUserEditData={setUserEditData}
      />

      <DeletePopUp
        heading="Delete Video"
        text={`Are you sure you want to delete ${videoName || ""}`}
        showOpen={deletePopUpOpen}
        cancelCallback={setDeletePopUpOpen}
        confirmCallback={handleProjectDelete}
      />

      <VideoPopUp
        videoPath={videoPath}
        showOpen={videoPopUpOpen}
        cancelCallback={setVideoPopUpOpen}
      />

      <Box sx={{ marginBottom: "12px" }}>
        {userDetails?.isAdmin && (
          <Box
            sx={{
              position: "fixed",
              bottom: 30,
              right: 30,
              borderRadius: "50%",
              backgroundColor: "#34d399",
              zIndex: 1,
            }}
            onClick={handleFormOpen}
          >
            <Fab color="primary">
              <AddIcon />
            </Fab>
          </Box>
        )}
      </Box>
      <Box>
        <Typography className="2xl:mt-10 mb-4 ml-4 text-3xl">Videos</Typography>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          component={Paper}
          className="table_wrapper max-h-[63vh] border border-[#2F96E1]"
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow style={{ backgroundColor: "#34d399", height: "35px" }}>
                {userTableHeading?.map((row, index) => (
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
            <TableBody>
              {videoData?.length > 0 &&
                (videoData?.length > 0 && rowsPerPage > 0
                  ? videoData?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : videoData
                ).map((row, index) => (
                  <>
                    <TableRow
                      key={index}
                      className={`${index % 2 ? "bg-[#E3F3FF]" : ""} `}
                    >
                      <TableCell
                        sx={{ minWidth: 350, textWrap: "nowrap" }}
                        className={`w-[70vw]`}
                        component="th"
                        scope="row"
                        onClick={() => handleProjectToggle(row._id)}
                      >
                        <div>
                          {active === row?._id ? (
                            <KeyboardArrowDownIcon
                              sx={{
                                transform: "rotate(180deg)",
                                transition: "0.3s",
                                marginRight: 2,
                              }}
                            />
                          ) : (
                            <KeyboardArrowDownIcon
                              sx={{
                                transition: "0.2s",
                                marginRight: 2,
                              }}
                            />
                          )}
                          {row?.projectName?.split("").join("")}
                        </div>
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {row?.videoDetails?.length}
                      </TableCell>
                    </TableRow>
                    {active === row?._id &&
                      (row?.videoDetails?.length > 0 ? (
                        <div className={`p-4 `}>
                          {row?.videoDetails?.map((videoURL) => (
                            <div
                              key={videoURL?._id}
                              className="p-1 inline-block relative hover:text-[#34d399]"
                            >
                              <div onClick={() => handleVideoPlay(videoURL)}>
                                <video
                                  src={`${base_url}${videoURL.pathName.substring(
                                    videoURL?.pathName?.indexOf("/public") +
                                      "/public".length
                                  )}#t=2`}
                                  className="w-36 lg:w-40 h-24 rounded-lg cursor-pointer object-cover"
                                ></video>
                                <div className="wrapper absolute top-[40%] left-[50%]">
                                  <div className="video-main">
                                    <div className="promo-video">
                                      <div className="waves-block">
                                        <div className="waves wave-1"></div>
                                        <div className="waves wave-2"></div>
                                        <div className="waves wave-3"></div>
                                      </div>
                                    </div>

                                    <NavLink
                                      href={`${base_url}${videoURL.pathName.substring(
                                        videoURL?.pathName?.indexOf("/public") +
                                          "/public"?.length
                                      )}`}
                                      className="video video-popup mfp-iframe "
                                    >
                                      <PlayArrowIcon className="mb-3" />
                                    </NavLink>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <p className="text-[12px] lg:text-[14px] my-2 w-[120px] text-ellipsis overflow-hidden	">
                                  {videoURL?.fileName}
                                </p>
                                {userDetails?.isAdmin && (
                                  <Delete
                                    fontSize="small"
                                    className=" my-2"
                                    sx={{ color: "#34d399", cursor: "pointer" }}
                                    onClick={() => {
                                      setVideoName(videoURL?.fileName);
                                      setDeletePopUpOpen(true);
                                      setVideoId(videoURL?._id);
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>
                          <p className="text-[14px] pl-14 text-[#A2A2A2]">
                            No video available
                          </p>
                        </div>
                      ))}
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          count={videoData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="place-self-center place-self-end w-[10%]"
        />
      </Paper>
    </>
  );
}
