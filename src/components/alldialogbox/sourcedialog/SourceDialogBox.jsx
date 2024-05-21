import { React } from "react";
import DialogBoxTabHeader from "../alltabs/tabheader/TabHeader";
import { Card, CardContent, Typography } from "@mui/material";

export default function SourceDialogBox() {
  return (
    <Card sx={{ minWidth: 600, minHeight: 600 }}>
      <CardContent>
        <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
          Sources
        </Typography>

        <DialogBoxTabHeader />
      </CardContent>
    </Card>
  );
}
