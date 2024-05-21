import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  Box,
  Button,
  Grid,
  CardContent,
  CardActionArea,
} from "@mui/material";

export default function Account({ setIsAuthenticated }) {
  const navigation = useNavigate();

  const [userDetails, setUserDetails] = useState();
  const [chatbots, setChatBots] = useState();

  useEffect(() => {
    setUserDetails(localStorage.getItem("userDetails"));
    setChatBots(localStorage.getItem("chatBots"));
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("userDetails");
    navigation("/");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <Grid
          container
          spacing={5}
          sx={{
            textAlign: "center",
            mt: 30,
          }}
        >
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ minWidth: 400, minHeight: 200 }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Usage
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Messages consumed: 98/5000
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Chatbot Count : {chatbots}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ minWidth: 400, minHeight: 200 }}>
              <CardActionArea
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Your Email
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userDetails}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ minWidth: 400, minHeight: 200 }}>
              <CardActionArea
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Chatbot API key
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Subscription required to get an API key.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{ p: 1, fontSize: 15 }}
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
