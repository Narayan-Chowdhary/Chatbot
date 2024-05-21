import { Box } from "@mui/material";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import EmbedOnSite from "./components/alldialogbox/embedonsite/EmbedOnSite";
import FileUploadProgressCard from "./components/FileUploadProgressCard";
import Sidebar from "./components/layout/Sidebar";
import ViewChatBot from "./components/viewchatbot";
import ViewProject from "./components/viewproject";
import ViewUserMessages from "./components/viewusermessage";
import Documents from "./pages/documents";
import Login from "./pages/login";
import Messages from "./pages/messages";
import NotFound from "./pages/notfound";
import AllChatBots from "./pages/projects";
import Settings from "./pages/settings";
import Testimonials from "./pages/testimonials";
import Users from "./pages/users";
import Videos from "./pages/videos";
import ViewDocuments from "./pages/viewDocuments";
import { AppContext } from "./store/store.context";
import ProtectedRoutes from "./utils/protectedRoute";

function App() {
  const { showFileUploadInProgress } = useContext(AppContext);

  return (
    <>
      {showFileUploadInProgress && <FileUploadProgressCard />}
      <Box>
        <Routes>
          <Route path="/" index element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<Sidebar  />}>
              <Route path="/projects" element={<AllChatBots />} />
              <Route path="/viewchatbot" element={<ViewChatBot />} />
              <Route path="/projects/viewchatbot" element={<ViewChatBot />} />
              <Route path="/projects/settings" element={<Settings />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/documents/:title" element={<ViewDocuments />} />
              <Route path="/users" element={<Users />} />
              <Route path="embed" element={<EmbedOnSite />} />
              <Route
                path="/viewproject/:projectName"
                element={<ViewProject />}
              />
              <Route path="/videos" element={<Videos />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/support" element={<Messages />} />
              <Route
                path="/support/:id"
                element={<ViewUserMessages />}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
