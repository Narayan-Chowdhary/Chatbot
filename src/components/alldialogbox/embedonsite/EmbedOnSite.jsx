import React from "react";
import { Box, Typography } from "@mui/material";

export default function EmbedOnSite() {
  return (
    <>
      <Box
        height={500}
        width={600}
        sx={{
          py: 4,
          px: 5,
        }}
      >
        <Box>
          <Box>
            <Typography
              variant="h5"
              sx={{
                pb: 2,
              }}
            >
              Embed on website
            </Typography>
          </Box>
          <Typography>
            To add the chatbot any where on your website, add this iframe to
            your html code
          </Typography>
          <Box
            sx={{
              my: 2,
              p: 2,
              fontSize: "15px",
              backgroundColor: "#d4d4d8",
            }}
          >
            {`<iframe
              src=${window?.location?.href}
              width="100%"
              style="height: 100%; min-height: 700px"
              frameborder="0"
            ></iframe>`}
          </Box>
        </Box>

        <Box>
          <Typography>
            To add a chat bubble to the bottom right of your website add this
            script tag to your html
          </Typography>
          <Box
            sx={{
              my: 2,
              p: 2,
              fontSize: "15px",
              backgroundColor: "#d4d4d8",
            }}
          >
            {`<iframe
              src=${window?.location?.href}
              width="100%"
              style="height: 100%; min-height: 700px"
              frameborder="0"
            ></iframe>`}
          </Box>
        </Box>
      </Box>
    </>
  );
}
