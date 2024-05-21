import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useRef } from "react";
import { useEffect, useState } from "react";
import ChatBoxImg from "../../assets/images/Chaticon.svg";
import Logo from "../../assets/images/Logo-removebg.png";
import { getMessages, sendMessage } from "../../services/chat.service";
import { socket } from "../../services/socket";
import { setAsRead } from "../../services/users.service";

export default function ChatBox() {
  const [openChat, setOpenChat] = useState(false);
  const [message, setMessage] = useState();
  const [roomId, setRoomId] = useState();
  const [chat, setChat] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages
    socket.on("chats", async (msg) => {
      setChat((prevMessages) => [...prevMessages, msg]);
      markRead();
    });
    // Clean up on component unmount
    return () => {
      socket?.off("chats");
    };
  }, [socket]);

  const markRead = () => {
    const data = {
      roomId: roomId,
      seenByUser: true,
    };
    setAsRead(data);
  };

  const connectRoom = (id) => {
    socket.emit("join_room", { roomId: id });
  };

  const HandleMessageSubmit = (e) => {
    e.preventDefault();
    if (message && message != " " && message?.trim() != "") {
      let data = {
        roomId: roomId,
        message: message,
        userId: userDetails?._id,
        seenByAdmin: false,
        seenByUser: true,
      };
      socket.emit("chats", data);
      setMessage("");
    }
  };

  const getAllMessages = async () => {
    const resp = await getMessages(roomId);
    if (resp?.status == 200) {
      setChat(resp?.data);
    }
  };
  const getRoomID = async () => {
    const resp = await sendMessage({
      userId: userDetails?._id,
      message: "hi",
    });
    if (resp?.status == 200) {
      setRoomId(resp?.data?.roomId);
      connectRoom(resp?.data?.roomId);
    }
  };
  useEffect(() => {
    roomId && getAllMessages();
    openChat && roomId && markRead();
    getRoomID();
  }, [openChat, roomId]);

  useEffect(() => {
    if (chatContainerRef?.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef?.current?.scrollHeight;
    }
  }, [chat]);

  const getTime = (time2) => {
    let d2 = new Date(time2);
    d2.setUTCHours(d2?.getUTCHours() + 5);
    d2.setUTCMinutes(d2?.getUTCMinutes() + 30);

    // Get the hour and minutes in IST
    let hoursIST = d2?.getUTCHours();
    let minutesIST = d2?.getUTCMinutes();

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
    if (Math.abs(diffMinutes) < 1 && d1?.getMinutes() == d2?.getMinutes())
      return false;
    else {
      return true;
    }
  };
  return (
    <>
      <div className="text-black-400 w-[100px] h-[48px] rounded-[40%] ">
        <div>
          {!openChat &&
            chat &&
            chat.length > 0 &&
            !chat[chat.length - 1]?.seenByUser && (
              // !chat[chat.length - 1].seenByUser
              <div className="bg-[#db4949] w-2 h-2 ml-4 rounded-full m-auto fixed bottom-16 right-8"></div>
            )}
          <div className="fixed bottom-8 right-8">
            <img
              src={ChatBoxImg}
              alt="chat-box-image"
              width={40}
              className="m-auto"
              onClick={() => setOpenChat(!openChat)}
            />
          </div>
          {openChat && (
            <div
              className="min-h-[400px] w-[300px]  bg-[#E3F3FF] border-2 border-[#dcdcdc] fixed bottom-4 rounded-lg right-4 "
              sx={{ transition: "all .8s ease" }}
            >
              <div className="h-[60px] bg-[#34d399] rounded-lg text-white flex justify-between ">
                <div className="my-auto ml-2">
                  <img src={Logo} alt="chat-box-image" width={100}></img>
                </div>
                <div className="pt-2 px-4" onClick={() => setOpenChat(false)}>
                  X
                </div>
              </div>
              <div className="bg-[#E3F3FF]">
                <div className="my-3">
                  <div
                    className="h-[280px] overflow-auto"
                    ref={chatContainerRef}
                  >
                    {chat &&
                      chat?.length > 0 &&
                      chat?.map((text, index) => (
                        <div
                          className=" text-white my-2 mx-3 flex-col"
                          key={index}
                          style={{
                            justifyContent: `${
                              text?.senderId == userDetails?._id
                                ? `flex-end`
                                : "flex-start"
                            }`,
                          }}
                        >
                          <div
                            className="flex  text-[#34d399] text-[12px]"
                            style={{
                              justifyContent: `${
                                text?.senderId == userDetails?._id
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
                                text?.senderId == userDetails?._id
                                  ? `flex-end`
                                  : "flex-start"
                              }`,
                            }}
                          >
                            <div className="flex-col bg-[#34d399] py-1 px-2 rounded-lg">
                              <p className="chat py-1 px-1 break-word !max-w-[200px]">
                                {text?.message}
                              </p>
                              <p className="text-[10px] justify-end flex items-end ml-3 break-keep">
                                {getTime(text?.timeStamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="relative mx-2 ">
                    <form onSubmit={HandleMessageSubmit}>
                      <input
                        type="text"
                        onChange={(e) => setMessage(e?.target?.value)}
                        value={message}
                        className="border-2 border-[#34d399] w-full pr-10 pl-2 h-9 rounded-lg  break-word"
                        placeholder="Let's chat..."
                      />

                      <button className="absolute right-2 top-1" type="submit">
                        <SendRoundedIcon sx={{ color: "#34d399" }} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
