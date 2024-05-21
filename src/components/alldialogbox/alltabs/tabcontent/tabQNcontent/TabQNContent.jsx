import { React, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function TabQNContent() {
  const [showBox, setShowBox] = useState(true);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setShowBox(false);
          }}
          sx={{
            mr: 5,
          }}
        >
          {showBox ? "Add" : "Add New"}
        </Button>
        {showBox ? (
          " "
        ) : (
          <Button
            onClick={() => {
              setShowBox(true);
            }}
            sx={{
              color: "red",
            }}
          >
            Delete All
          </Button>
        )}
      </Box>

      {showBox ? (
        ""
      ) : (
        <Box>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <DeleteForeverIcon
                    color="error"
                    sx={{
                      fontSize: "30px",
                      cursor: "pointer",
                    }}
                  />
                </Box>
                <Box>
                  <Typography>Question</Typography>
                  <TextField fullWidth />
                </Box>
                <Box>
                  <Typography>Answar</Typography>
                  <TextField fullWidth multiline rows={5} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
}
