import { Box, Button, Popover, Typography } from "@mui/material";
import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import DeletePopUp from "../common/DeletePopUp";
import VideoPopUp from "../common/VideoPopUp";
import AddTestimonials from "../AddTestimonials";

export default function TestimonialsEditPopOver({ testimonialData }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = anchorEl;
    const [deletePopUpOpen, setDeletePopUpOpen] = useState(false)
    const [videoPopUpOpen, setVideoPopUpOpen] = useState(false)
    const [editFormOpen, setEditFormOpen] = useState(false)

    const handleClick = (event) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProjectDelete = async () => {
        // const res = await deleteProject(botNameTableId)
        setDeletePopUpOpen(false)
        // props.fetchData()
    }

    const handleVideoPlay = (videoURL) => {
        setVideoPopUpOpen(true);
        // setVideoPath(`${base_url}${videoURL.pathName.substring(
        //     videoURL.pathName.indexOf("/public") +
        //     "/public".length
        // )}`)
    }

    return (
        <>

            {editFormOpen && <AddTestimonials
                formOpen={editFormOpen}
                setFormOpen={setEditFormOpen}
                testimonialData={testimonialData}
            />}

            <DeletePopUp
                heading="Delete Video"
                // text={`Are you sure you want to delete ${names || ''}`}
                text={`Are you sure you want to delete Video`}
                showOpen={deletePopUpOpen}
                cancelCallback={setDeletePopUpOpen}
                confirmCallback={handleProjectDelete}
            />

            <VideoPopUp
                videoPath={testimonialData.video_file}
                showOpen={videoPopUpOpen}
                cancelCallback={setVideoPopUpOpen}
            />

            <MoreVertIcon sx={{ cursor: "pointer" }} onClick={handleClick} />

            <Popover
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handleClose}
                open={open}
                anchorEl={anchorEl}

            >

                <Box
                    onClick={() => { setEditFormOpen(true); setAnchorEl(null) }}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start',
                        px: 3,
                        pb: 1,
                        cursor: "pointer",
                        '&:hover': {
                            color: '#34d399',
                            bgcolor: '#e7e5e4'
                        }
                    }}
                >
                    <Typography sx={{ pt: 1, pr: 2 }}>
                        <CreateIcon />
                    </Typography>
                    <Typography sx={{ pt: 1, pr: 2 }}>
                        Edit
                    </Typography>
                </Box>
                <Box
                    onClick={() => { setDeletePopUpOpen(true); setAnchorEl(null) }}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                        px: 3,
                        pb: 1,
                        cursor: "pointer",
                        "&:hover": {
                            color: '#34d399',
                            backgroundColor: "#e7e5e4",
                        },
                    }}>
                    <Typography sx={{ pt: 1, pr: 2 }}>
                        <DeleteIcon
                            sx={{
                                cursor: "pointer",
                            }}
                        />
                    </Typography>
                    <Typography
                        sx={{
                            pt: "10px",
                            color: "black",
                        }}
                    >
                        Delete
                    </Typography>
                </Box>

                <Box
                    onClick={() => { setVideoPopUpOpen(true); setAnchorEl(null) }}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                        px: 3,
                        pb: 1,
                        cursor: "pointer",
                        "&:hover": {
                            color: '#34d399',
                            backgroundColor: "#e7e5e4",
                        },
                    }}>
                    <Typography sx={{ pt: 1, pr: 2 }}>
                        <PlayArrowIcon
                            fontSize="medium"
                            sx={{
                                cursor: "pointer",
                            }}
                        />
                    </Typography>
                    <Typography
                        sx={{
                            pt: "10px",
                            color: "black",
                        }}
                    >
                        Play Video
                    </Typography>
                </Box>

            </Popover>

        </>
    )
}