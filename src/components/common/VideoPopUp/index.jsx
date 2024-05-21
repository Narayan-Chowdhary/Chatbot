import { Box, Button, Dialog, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


export default function VideoPopUp(props) {
    const { cancelCallback, showOpen, videoPath } = props
    return (
        <>
            <Dialog
                open={showOpen}
                onClose={cancelCallback}
                maxWidth={800}
            >
                <Box
                    sx={{
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
                    <video controls autoPlay width="900">
                        <source src={videoPath} />
                    </video>
                </Box>
            </Dialog >

        </>
    )
}