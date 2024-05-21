import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../assets/images/Logo-removebg.png";
import { getMessages } from "../../services/chat.service";
import { socket } from "../../services/socket";
import { setAsRead } from "../../services/users.service";
import ScrollToBottom from "react-scroll-to-bottom";

export default function ViewUserMessages() {
  const [message, setMessage] = useState();
  const [chat, setChat] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [roomId, setRoomId] = useState();
  const { state } = useLocation();
  const chatContainerRef = useRef(null);

  const HandleMessageSubmit = (e) => {
    e.preventDefault();
    if (message && message != " " && message?.trim() != "") {
      let data = {
        roomId: roomId,
        message: message,
        userId: userDetails?._id,
        seenByAdmin: true,
        seenByUser: false,
      };
      socket.emit("chats", data);
      setMessage("");
    }
  };
  const getAllMessages = async () => {
    const resp = await getMessages(state?.roomId);
    if (resp?.status == 200) {
      setChat(resp?.data);
    }
  };

  useEffect(() => {
    if (!socket) return;
    console.log(roomId, "hererererer");

   roomId && socket.on("chats", async (msg) => {
      (msg?.senderId == roomId?.split("_")[1] ||
        msg?.senderId == userDetails?._id) &&
        setChat((prevMessages) => [...prevMessages, msg]);
      markRead();
    });

    return () => {
      socket.off("chats");
    };
  }, [socket, roomId]);

  useEffect(() => {
    console.log(roomId);
  }, [roomId]);
  const connectRoom = () => {
    socket.emit("join_room", { roomId: state?.roomId });
  };

  useEffect(() => {
    connectRoom();
    setRoomId(state?.roomId);
    getAllMessages();
    markRead();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const getTime = (time2) => {
    let d2 = new Date(time2);
    d2.setUTCHours(d2.getUTCHours() + 5);
    d2.setUTCMinutes(d2.getUTCMinutes() + 30);

    // Get the hour and minutes in IST
    let hoursIST = d2.getUTCHours();
    let minutesIST = d2.getUTCMinutes();

    // Format hour and minute to hh:mm format
    let formattedTime = `${hoursIST < 10 ? "0" : ""}${hoursIST}:${
      minutesIST < 10 ? "0" : ""
    }${minutesIST}`;

    return formattedTime;
    // }
  };

  const displayName = (time1, time2) => {
    let d1 = new Date(time1);
    let d2 = new Date(time2);
    let diffMs = d1 - d2;

    // Convert milliseconds to minutes
    let diffMinutes = diffMs / (1000 * 60);
    if (Math.abs(diffMinutes) < 1 && d1.getMinutes() == d2.getMinutes())
      return false;
    else {
      return true;
    }
  };

  const markRead = () => {
    const data = {
      roomId: state?.roomId,
      seenByAdmin: true,
    };
    setAsRead(data);
  };
  return (
    <>
      <div className="h-[80vh] flex justify-center items-center  ">
        <div className=" md:w-[50vw] xl:w-[40vw] h-[70vh]  bg-[#E3F3FF] border-2 border-[#dcdcdc] rounded-[20px] pb-10 realtive ">
          <div className="h-[8vh] bg-[#34d399] rounded-[16px] flex items-center justify-between">
            <div className="pl-4 shadow-lg">
              <img src={Logo} alt="hiteshi-logo" width={140} />
            </div>
            <div className="text-white mr-4 text-[18px]">
              <p>{chat[0]?.fullName}</p>
            </div>
          </div>
          <div>
            <div ref={chatContainerRef}>
              <ScrollToBottom className="h-[55vh] lg:h-[53vh] ">
                {chat &&
                  chat?.map((text, index) => (
                    <div
                      key={index}
                      className="flex  text-white my-2 mx-3 ml-10  flex-col"
                    >
                      <div
                        className="flex  text-[#34d399] text-[12px]"
                        style={{
                          justifyContent: `${
                            text?.senderId == userDetails?._id || text?.isAdmin
                              ? `flex-end`
                              : "flex-start"
                          }`,
                        }}
                      >
                        {index > 0 &&
                        chat[index - 1]?.senderId == chat[index]?.senderId
                          ? displayName(
                              chat[index - 1]?.timeStamp,
                              text?.timeStamp
                            ) && text?.fullName
                          : text?.fullName}
                      </div>
                      <div
                        className="flex "
                        style={{
                          justifyContent: `${
                            text?.senderId == userDetails?._id || text?.isAdmin
                              ? `flex-end`
                              : "flex-start"
                          }`,
                        }}
                      >
                        <div className="flex-col bg-[#34d399] py-1 px-2 rounded-lg">
                          <p className="chat py-1 px-2 break-word">
                            {text?.message}
                          </p>
                          <p className="text-[10px] justify-end flex items-end ml-3 ">
                            {getTime(text?.timeStamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </ScrollToBottom>
            </div>
            <div>
              <div className="mx-2 md:mx-4 lg::mx-8 relative absolute bottom-0 ">
                <form onSubmit={HandleMessageSubmit}>
                  <input
                    type="text"
                    onChange={(e) => setMessage(e?.target?.value)}
                    value={message}
                    placeholder="Reply..."
                    className="border-2 border-[#34d399] w-full h-9 rounded-lg pl-2 pr-12"
                  />
                  <button className="absolute right-4 top-1 " type="submit">
                    <SendRoundedIcon sx={{ color: "#34d399" }} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
