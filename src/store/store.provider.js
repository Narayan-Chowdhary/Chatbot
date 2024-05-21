import { useEffect, useState } from "react";
import { AppContext } from "./store.context";
import { useLocation } from "react-router";
import { addVideo } from "../services/videos.service";
// import { addVideo } from "../services/video.service";

export const AppProvider = ({ children }) => {
  const [projectData, setProjectData] = useState([]);
  const [documentData, setDocumentData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [showFileUploadInProgress, setShowFileUploadInProgress] =
    useState(false);
  const [videoUploadProgress, setVideoUploadProgress] = useState();
  const [videoTitle, setVideoTitle] = useState();
  const [uploadStatus, setUploadStatus] = useState("upload");
  const location = useLocation();

  const handleVideoUpload = async (formData, data) => {
    setVideoTitle(data.title);
    setShowFileUploadInProgress(true);
    setUploadStatus("upload");
    const { resp, percentCompleted } = await addVideo(
      formData,
      setVideoUploadProgress
    );
    console.log(resp.status, percentCompleted);
    if (resp.status == 200 && percentCompleted == 100) {
      setUploadStatus("success");
    } else {
      setUploadStatus("fail");
    }
    return resp;
  };

  useEffect(() => {
    return () => {
      setDocumentData([]);
      setProjectData([]);
      setUserData([]);
    };
  }, [location, location.pathname]);

  return (
    <AppContext.Provider
      value={{
        projectData,
        documentData,
        userData,
        showFileUploadInProgress,
        setProjectData,
        setDocumentData,
        setUserData,
        setShowFileUploadInProgress,
        handleVideoUpload,
        videoUploadProgress,
        uploadStatus,
        setUploadStatus,
        videoData,
        setVideoData,
        videoTitle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
