import { useNavigate } from "react-router-dom";

import { Page_Not_Found } from "../../utils/_data/NotFound";

import { Box, Button, Grid, Typography } from "@mui/material";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <Box>
        <Box>
          <Grid container spacing={{ md: 2, lg: 6, xl: 10 }}>
            <Grid item xs={6}>
              <Box>
                <img src={Page_Not_Found?.img} alt={Page_Not_Found?.img_alt} />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{}}>
                <Typography variant="h4">{Page_Not_Found?.Heading}</Typography>
                <Typography variant="h4">
                  {Page_Not_Found?.subHeading}
                </Typography>
                <Typography variant="caption">{Page_Not_Found?.text}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={() => navigate(Page_Not_Found?.link)}
              >
                Go Back To Home
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
