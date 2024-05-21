import { io } from "socket.io-client";



// Create Socket.io instance
  export const socket = io(process.env.REACT_APP_BASEURL);

