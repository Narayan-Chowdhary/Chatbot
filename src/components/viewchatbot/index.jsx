import Logo from "../../assets/images/Logo-removebg.png";
import { React, useState, useRef, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { chatApi } from "../../services/chatbot.services";
import { useLayoutEffect } from 'react';
import { Box, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { blue } from "@mui/material/colors";
import Loader from "../loader";
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

export default function ViewChatBot() {
  const location = useLocation();
  const inputRef = useRef(null);
  const dataImportedFromSettingOfChatbot = JSON.parse(location?.state);
  const chatbox = useRef(null);
  const messageRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [projectEndPoint] = useState(dataImportedFromSettingOfChatbot?.dataExportingToSettingOfChatbot?.projectEndPoint);
  const [disableTypingMessage, setDisableTypingMessage] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  
  useEffect(() => {
    if (chatbox?.current) {
      chatbox?.current?.scrollIntoView(false)
    }
  }, [messages]);

  useEffect(() => {
    if (inputRef?.current && !disableTypingMessage) {
      inputRef?.current?.focus();
    }
 }, [disableTypingMessage]);

  const handleInputChange = (e) => {
    setInput(e?.target?.value);
  };

  const [likeBtn, setLikeBtn] = useState([]);
  const [disLikeBtn, setDisLikeBtn] = useState([]);
  const [currentIndex] = useState(messages?.length - 1);
  const headerColor =
  dataImportedFromSettingOfChatbot?.dataExportingToSettingOfChatbot?.headerColor ||
  'defaultColor'; 


  useEffect(() => {
    // Scroll the message list to the last message
    if (messageRef?.current) {
      messageRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentIndex]);

  const handleSendMessageOnEnter = (event) => {
    if (event.keyCode === 13 && input?.trim() !== "" && event?.key === 'Enter') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: input, sender: "user" },
      ]);
      setShowLoader(true);
      setDisableTypingMessage(true);
      setInput("");
      inputRef.current?.focus();
      botReplyToUser([...messages, { user: input, sender: "user" }]);
    }
  };

  const handleSendMessage = (event) => {
    if (input?.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: input, sender: "user" },
      ]);
      setDisableTypingMessage(true);
      setShowLoader(true);
      setInput("");
      inputRef.current.focus();
      botReplyToUser([...messages, { user: input, sender: "user" }]);
    }
  };

  const botReplyToUser = useCallback(async (messages) => {
    try {
      const lastMessage = messages[messages?.length - 1];  
      if (lastMessage?.sender === "user") {
        setShowLoader(true);
        const apiCall = await chatApi(messages, projectEndPoint, dataImportedFromSettingOfChatbot?.dataExportingToSettingOfChatbot?.token)

        setShowLoader(false);
        setDisableTypingMessage(false);
        inputRef.current.focus();
        setMessages([...messages.reverse(), {
          "response": apiCall?.response,
          "sender": "bot"
        }])
        setDisableTypingMessage(false);
        return apiCall;
      }
      else {
        setShowLoader(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, [projectEndPoint]);

  const handleLikeMessage = (index) => {
    const updatedLikes = [...likeBtn];
    const updatedDisLikes = [...disLikeBtn];
    updatedDisLikes[index] = false;
    updatedLikes[index] = !updatedLikes[index];
    setLikeBtn(updatedLikes);
    setDisLikeBtn(updatedDisLikes);
  }

  const handleDisLikeMessage = (index) => {
    const updatedLikes = [...likeBtn];
    const updatedDisLikes = [...disLikeBtn];
    updatedLikes[index] = false;
    updatedDisLikes[index] = !updatedDisLikes[index];
    setDisLikeBtn(updatedDisLikes);
    setLikeBtn(updatedLikes);
  }

  useLayoutEffect(() => {
    if (!disableTypingMessage && inputRef?.current) {
      inputRef.current?.focus();
    }
  }, [disableTypingMessage]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "50vw",
          minHeight: "80vh",
          maxHeight: "80vh",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          p: 1,
          boxShadow: "-12px -8px 40px rgba(70,70,70,0.12) inset;",
          background: ""
        }}
      >
        <Box
          sx={{
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: " center",
            width: "100%",
            backgroundColor:
            headerColor,
          }}
        >
          <img src={Logo} alt="nk" style={{height:"40px"}} />
          <Box>
            <Typography variant="h6">
              {
                dataImportedFromSettingOfChatbot
                  ?.dataExportingToSettingOfChatbot?.projectName
              }
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            pr: 2,
            pl: 1,
            flexDirection: "column",
            alignItems: "end",
            border: "15px",
            height: "100%",
            overflow: "scroll",
            backgroundColor: dataImportedFromSettingOfChatbot
              ?.dataExportingToSettingOfChatbot?.theme
              ? "white"
              : "#1e293b",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#7dd3fc",
              width: "fit-content",
              maxWidth: "auto",
              height: "auto",
              py: "8px",
              px: "15px",
              borderBottomRightRadius: "15px",
              borderBottomLeftRadius: "15px",
              borderTopRightRadius: "15px",
              margin: "3px 0px",
              display: "flex",
              justifyContent: "start",
            }}
          >
            {
              dataImportedFromSettingOfChatbot?.dataExportingToSettingOfChatbot
                ?.initialMessage
            }
          </Box>

          <Box sx={{ position: "relative" }}>
            {messages?.map((message, index) => (
              <>
                {message?.user && <Box
                  ref={chatbox}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",

                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#7dd3fc",
                      width: "auto",
                      maxWidth: "auto",
                      height: "auto",
                      py: "8px",
                      px: " 15px",
                      borderBottomRightRadius: "15px",
                      borderBottomLeftRadius: "15px",
                      borderTopLeftRadius: "15px",
                      margin: "3px 0px",
                    }}
                    className={`message ${message.sender}`}
                  >

                    {message?.sender === "user" && (
                      <Typography variant="body1" color="textPrimary">
                        {typeof message?.user === 'object' ? message?.user?.user : message?.user}
                      </Typography>
                    )}


                  </Box>
                </Box>}
                {message?.response && <><Box
                  ref={chatbox}
                  sx={{
                    backgroundColor: "#7dd3fc",
                    width: "fit-content",
                    maxWidth: "60%",
                    height: "auto",
                    py: "8px",
                    px: " 15px",
                    borderBottomRightRadius: "15px",
                    borderBottomLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                    margin: "3px 0px",
                    display: "flex",
                    justifyContent: "start",

                  }}
                >
                  <Box>
                    <div>
                      <div>
                        {/* <p> 
                            {message.sender === "bot"
                              ? message.text
                              : message.text}
                              fdsfdsfds dfdsfds
                          </p> */}
                        {/* {showLoader && <Loader />} */}
                      </div>
                    </div>
                  </Box>
                  <Typography variant="body1" color="textPrimary" marginRight={1}>
                    {message?.response}
                  </Typography>
                  <Box>
                    {likeBtn[index] ? <ThumbUpRoundedIcon
                      onClick={handleLikeMessage} /> :
                      <ThumbUpOutlinedIcon onClick={() => handleLikeMessage(index)} />
                    }</Box>
                  <Box>
                    {disLikeBtn[index] ? <ThumbDownRoundedIcon
                      onClick={handleDisLikeMessage} /> :
                      <ThumbDownOutlinedIcon onClick={() => handleDisLikeMessage(index)} />
                    }</Box>
                </Box>
                </>
                }
              </>
            ))}

            {showLoader && <Box sx={{ position: "absolute", bottom: "-5px" }}>
              <Loader /></Box>}
          </Box>


        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            alignContent: "center"
          }}
          ref={messageRef}
        >
          <TextField
            sx={{
              minWidth: "45vw",
              padding: "10px",
              paddingX: "5px",
              justifyContent: "center",
              alignContent: "center"
            }}
            inputRef={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyUp={handleSendMessageOnEnter}
            placeholder={
              showLoader ? "Wait till Bot Reply..." : "Type a message..."
            }
            InputProps={{
              sx: { borderRadius: "20px", padding: "1px" },
            }}
            size="small"
            disabled={disableTypingMessage ? true : false}
          />
          <Box
            sx={{
              backgroundColor:
                dataImportedFromSettingOfChatbot
                  ?.dataExportingToSettingOfChatbot?.headerColor,
              padding: "6px",
              borderRadius: "40px",
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SendIcon
              onClick={handleSendMessage}
              sx={{
                color: blue[500],
                fontSize: 25,
                cursor: "pointer",
                "&:hover": {
                  color: blue[300],
                },
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
