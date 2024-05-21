import  React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Box } from "@mui/material";
import {
    Input,
    Button, 
  } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

export default function PDFDialogBox({showPopup,close,submit,file, showLoader=false}) {
    return (
     <Box sx={{
      position: 'relative'
    }}>
     <Dialog open={showPopup} onClose={close} >
        <DialogTitle sx={{width: 500, height: 150,fontWeight: 'bold'}}>Select a PDF File</DialogTitle>
        <DialogContent>
          <Input
            type="file"
            accept="application/pdf,application/vnd.ms-excel"
            directory="true"
            webkitdirectory="true"
            onChange={file}
            fullWidth
            sx={{
              marginBottom:'70px' ,
              padding: '10px 20px',
              borderRadius: '5px',
              border: '2px solid #ccc',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#444',
            }}
            disabled={showLoader}
          />
          {showLoader ? 
            <Box sx={{
                position: 'absolute',
                background: '#ffffffcc',
                top: 0,
                bottom: 0,
                right : 0,
                left : 0,
                zIndex : 1,
                display: 'flex'
              }}>
                <CircularProgress sx={{margin : 'auto'}} />
            </Box> : <></>}
          
        </DialogContent>
        <DialogActions>
          <Button  onClick={close}>Cancel</Button>
          <Button  onClick={submit}>Submit</Button>
        </DialogActions>
      </Dialog>
     </Box>
    );
  }
  