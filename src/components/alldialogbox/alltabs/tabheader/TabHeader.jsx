import { React, useState } from "react";

import TabFilesContent from "../tabcontent/tabfilescontent/TabFilesContent";
import TabQNContent from "../tabcontent/tabQNcontent/TabQNContent";
import TabTextContent from "../tabcontent/tabtextcontent/TabTextContent";
import TabWebsiteComponent from "../tabcontent/tabwebsite/TabWebsiteComponent";

import { Tabs, Tab, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";

function DialogBoxTabHeader(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

DialogBoxTabHeader?.propTypes = {
  children: PropTypes.node,
  index: PropTypes?.number?.isRequired,
  value: PropTypes?.number?.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Files" {...a11yProps(0)} />
          <Tab label="Text" {...a11yProps(1)} />
          <Tab label="Q & A" {...a11yProps(2)} />
          <Tab label="Website" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <DialogBoxTabHeader value={value} index={0}>
        <TabFilesContent />
      </DialogBoxTabHeader>
      <DialogBoxTabHeader value={value} index={1}>
        <TabTextContent />
      </DialogBoxTabHeader>
      <DialogBoxTabHeader value={value} index={2}>
        <TabQNContent />
      </DialogBoxTabHeader>
      <DialogBoxTabHeader value={value} index={3}>
        <TabWebsiteComponent />
      </DialogBoxTabHeader>
    </Box>
  );
}
