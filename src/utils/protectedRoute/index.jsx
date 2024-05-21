import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const location = useLocation()
  const nav = useNavigate()
  const token = localStorage.getItem("collection_token")

  const handleViewChatBotRefresh = () => {
    if(location.pathname === '/viewchatbot'){
      nav('/projects')
    }
  }

  useEffect(() => {
    window.addEventListener("load", handleViewChatBotRefresh)

    return () => {
      //cleaning up when unmounting to prevent memory leak
      window.removeEventListener("load", handleViewChatBotRefresh);
    };
  }, [])



  if (!token) {
    return <Navigate to="/" replace={true} />;
  }
  return <Outlet />
};

export default ProtectedRoutes;


