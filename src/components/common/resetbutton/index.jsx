import React from "react";
import { update } from '../../../services/projects.service'
import { Button } from "@mui/material";

export default function ResetButton(props) {
  const {
    detailsOfSettingForm,
    setDetailsOfSettingForm,
    lableName,
    lableNameSec,
  } = props;

  const handleResetButton = async () => {
    const temp = { ...detailsOfSettingForm };
    if (lableName?.length > 0) {
      temp[lableName] = "";
      if (lableNameSec) {
        temp[lableNameSec] = "";
      }
      setDetailsOfSettingForm(temp);
    }
    try {
      const res = await update(temp)
      return res;
    
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#289CE8",
          fontSize: 12,
        }}
        onClick={handleResetButton}
      >
        Reset
      </Button>
    </>
  );
}
