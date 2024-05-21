import { React, useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableHead,
    TableRow,
    Paper,
    Box,
    Fab,
    Switch,
    Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import AddIcon from '@mui/icons-material/Add';
import { allUsers, update } from "../../services/users.service";
import AddUpdateUser from "../../components/AddUpdateUser";
// import { AppContext } from "../../store/store.context";
import EditIcon from '@mui/icons-material/Edit';
import TableLoader from "../../components/TableLoader";
import AddTestimonials from "../../components/AddTestimonials";
import TestimonialsEditPopOver from "../../components/testimonialsEditPopOver";
import UserTestimonials from "../../components/UserTestimonials";

export default function Testimonials() {
    const navigate = useNavigate();
    const location = useLocation()
    const [formOpen, setFormOpen] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '')
    // const { userData, setUserData } = useContext(AppContext)
    const userData = [
        {
            title: "This is title 1",
            description: "The main idea behind Socket.IO is that you can send and receive any events you want, with any data you want. Any objects that can be encoded as JSON will do, and binary data is supported too.",
            technology: "React, mui , tailwind ",
            name: "Narayan",
            company_name: "Nk",
            project_name: "collection ",
            project_duration: "2 months",
            client_img: 'https://images.pexels.com/photos/2977738/pexels-photo-2977738.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
            video_file: 'https://www.w3schools.com/tags/movie.mp4',
            video_file_name: "movie.mp4"
        },
        {
            title: "This is title 2",
            description: "Let’s make it so that when the user types in a message, the server gets it as a chat message event. The script section in index.html should now look as follows:",
            technology: "React, mui , tailwind ",
            name: "Narayan",
            company_name: "Nk",
            project_name: "collection ",
            project_duration: " 2 months",
            client_img: 'https://images.pexels.com/photos/749072/pexels-photo-749072.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
            video_file: 'https://www.w3schools.com/html/mov_bbb.mp4',
            video_file_name: "movie.mp4",

        },
        {
            title: "This is title 3",
            description: "The next goal is for us to emit the event from the server to the rest of the users.",
            technology: "React, mui , tailwind ",
            name: "Narayan",
            company_name: "Nk",
            project_name: "collection ",
            project_duration: " 2 months",
            client_img: 'https://images.pexels.com/photos/2977738/pexels-photo-2977738.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
            video_file: 'https://www.w3schools.com/html/mov_bbb.mp4',
            video_file_name: "movie.mp4"
        },
        {
            title: "This is title 2",
            description: "Let’s make it so that when the user types in a message, the server gets it as a chat message event. The script section in index.html should now look as follows:",
            technology: "React, mui , tailwind ",
            name: "Narayan",
            company_name: "Nk",
            project_name: "collection ",
            project_duration: " 2 months",
            client_img: 'https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            video_file: 'https://www.w3schools.com/tags/movie.mp4',
            video_file_name: "movie.mp4"
        },
        {
            title: "This is title 3",
            description: "The next goal is for us to emit the event from the server to the rest of the users.",
            technology: "React, mui , tailwind ",
            name: "Narayan",
            company_name: "Nk",
            project_name: "collection ",
            project_duration: " 2 months",
            client_img: 'https://images.pexels.com/photos/2946199/pexels-photo-2946199.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
            video_file: 'https://www.w3schools.com/tags/movie.mp4',
            video_file_name: "movie.mp4"
        }
    ]
    // const [loading, setLoading] = useState(true)

    const userTableHeading = ["Title", "Description", "Technology", "Client Name", "Company Name", "Project Name", "Duration", "Actions"]

    // const fetchData = async () => {
    //     try {
    //         const response = await allUsers()
    //         if (response && response.data) {
    //             setUserData(response.data);
    //             setLoading(false)

    //         }

    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };

    // useEffect(() => {
    //     if (!userDetails.isAdmin) {
    //         navigate('/projects')
    //     }
    // }, [])

    // useEffect(() => {
    //     fetchData()
    // }, [page, rowsPerPage, location, location.pathname])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target?.value, 10));
        setPage(0);
    };

    const handleFormOpen = () => {
        setFormOpen(true)
    }

    return (
        <>
            {/* {loading && <TableLoader />} */}

            <AddTestimonials
                formOpen={formOpen}
                setFormOpen={setFormOpen}
                testimonialData={''}
            />

            {userDetails?.isAdmin ?

                <>
                    <Box sx={{ marginBottom: '12px' }}>
                        <Box sx={{
                            position: "fixed",
                            bottom: 30,
                            right: 30,
                            borderRadius: "50%",
                            backgroundColor: '#34d399',
                            zIndex: 1
                        }}
                        >
                            <Fab color="primary" onClick={handleFormOpen} >
                                <AddIcon />
                            </Fab>
                        </Box>
                    </Box>

                    <Box>
                        <Typography className="2xl:mt-10 mb-4 ml-4 text-3xl">Testimonials</Typography>
                    </Box>

                    <TableContainer component={Paper} className="table_wrapper max-h-[70vh] border border-[#2F96E1]" >
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow style={{ 'backgroundColor': '#34d399', "height": '35px' }}>
                                    {userTableHeading?.map((row, index) => (
                                        <TableCell sx={{ fontWeight: 'bold', textWrap: 'nowrap', backgroundColor: "#34d399", color: "white" }} key={index} align="left" className="Heading-Fonts">
                                            {row}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {(userData && rowsPerPage > 0
                                    ? userData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : userData
                                ).map((row, index) => (
                                    <TableRow
                                        key={index} className={`${index % 2 ? "bg-[#E3F3FF]" : "bg-white"} `} >
                                        <TableCell sx={{ textWrap: 'nowrap', minWidth: 150 }} component="th" scope="row">
                                            {row?.title?.split('').join('')}
                                        </TableCell>

                                        <TableCell sx={{ minWidth: 250 }} component="th" scope="row">
                                            {row?.description?.split(',').join(', ')}
                                        </TableCell>

                                        <TableCell sx={{ minWidth: 150 }} component="th" scope="row">
                                            {row?.technology?.split(',').join(', ')}
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            {row?.name?.split(',').join(', ')}
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            {row?.company_name?.split(',').join(', ')}
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            {row?.project_name?.split(',').join(', ')}
                                        </TableCell>

                                        <TableCell component="th" scope="row">
                                            {row?.project_duration?.split(',').join(', ')}
                                        </TableCell>

                                        <TableCell component='th' scope="row" >
                                            <TestimonialsEditPopOver testimonialData={row} />
                                        </TableCell>

                                    </TableRow>
                                ))}
                                <TablePagination
                                    rowsPerPageOptions={[10, 20, 50]}
                                    count={userData?.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
                :
                <>
                    <UserTestimonials userData={userData} />
                </>
            }
        </>
    );
}
