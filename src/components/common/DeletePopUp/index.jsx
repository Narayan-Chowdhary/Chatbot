import React from 'react';
import {
    Dialog,
    Box,
    Typography,
    Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function DeletePopUp(props) {
    const { showOpen, cancelCallback, confirmCallback, heading, text } = props

    return (
        <>
            <Dialog
                open={showOpen}
                onClose={cancelCallback}
                PaperProps={{
                    sx: {
                        minWidth: '20vw',
                        // minHeight: '20vh'
                    }
                }}
            >
                <Box sx={{
                    display: "flex",
                    justifyContent: "end",
                    position: 'absolute',
                    zIndex: 9,
                    right: 10,
                    top: 12
                }}>
                    <CloseIcon sx={{ cursor: "pointer" }} onClick={() => {
                        cancelCallback(false)
                    }} />
                </Box>
                <Box>
                    <Typography
                        variant="h5"
                        sx={{
                            margin: 2
                        }}
                    >
                        {heading}
                    </Typography>
                    <Box style={{ margin: 20 }}>
                        <Typography>
                            {text}
                        </Typography>

                    </Box>
                    <Box style={{ display: "flex", justifyContent: "end", paddingBottom: 20 }}>
                        <Box>
                            <Button style={{ marginTop: 20, marginRight: 20, background: '#34d399' }} variant="contained" onClick={() => cancelCallback(false)}>Cancel</Button>

                            <Button style={{ marginTop: 20, marginRight: 20 }} variant="outlined" onClick={confirmCallback} >Confirm</Button>
                        </Box>
                    </Box>

                </Box>
            </Dialog >
        </>
    );
}
