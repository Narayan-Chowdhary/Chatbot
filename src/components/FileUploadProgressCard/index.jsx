import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorIcon from "@mui/icons-material/Error";
import Box from "@mui/material/Box";
import CancelIcon from "@mui/icons-material/Cancel";
import { AppContext } from "../../store/store.context";
import { useContext } from "react";

export default function FileUploadProgressCard({ }) {
  const {
    setShowFileUploadInProgress,
    videoUploadProgress,
    uploadStatus,
    videoTitle,
  } = useContext(AppContext);
  return (
    <div style={{ position: "relative" }}>
      <div className="custom_fileuploader">
        <div
          className="close_icon"
          onClick={() => setShowFileUploadInProgress(false)}
        >
          <CancelIcon />
        </div>
        <Box>
          {uploadStatus == "upload" ? (
            <CircularProgress
              value={videoUploadProgress}
              variant="determinate"
            />
          ) : uploadStatus == "success" ? (
            <CheckCircleOutlineIcon color="success" fontSize="large" />
          ) : (
            <ErrorIcon sx={{ color: "#FA113D" }} fontSize="large" />
          )}
        </Box>

        <div
          className="file_name flex"
          title={`Ogie'sForever-InfiniteZoomingDreamscapes[4kUHDAIAnimation_11+HoursAIGeneratedVideo].mp4`}
        >
          <p>{videoUploadProgress}%</p>
          <p className="mx-2 text-ellipsis overflow-hidden w-[100px]">{videoTitle}</p>
        </div>
      </div>
    </div>
  );
}
