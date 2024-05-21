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
import AddIcon from "@mui/icons-material/Add";
import { allUsers, update } from "../../services/users.service";
import AddUpdateUser from "../../components/AddUpdateUser";
import { AppContext } from "../../store/store.context";
import EditIcon from "@mui/icons-material/Edit";
import TableLoader from "../../components/TableLoader";

export default function Users() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formOpen, setFormOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [userEditData, setUserEditData] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "");
  const { userData, setUserData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const userTableHeading = userDetails.isAdmin
    ? ["Full Name", "Email", "Status", "Role", "Last Logged In", "Action"]
    : ["Full Name", "Email", "Status", "Role", "Last Logged In"];

  const fetchData = async () => {
    try {
      const response = await allUsers();
      if (response && response?.data) {
        setUserData(response?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!userDetails?.isAdmin) {
      navigate("/projects");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, location, location?.pathname]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target?.value, 10));
    setPage(0);
  };

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleStatusChange = async (event, id) => {
    try {
      const response = await update({ id, isActive: event?.target?.checked });
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      {loading && <TableLoader />}

      <AddUpdateUser
        formOpen={formOpen}
        setFormOpen={setFormOpen}
        fetchData={fetchData}
        userEditData={userEditData}
        setUserEditData={setUserEditData}
      />

      <Box sx={{ marginBottom: "12px" }}>
        <Box
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            borderRadius: "50%",
            backgroundColor: "#34d399",
            zIndex: 1,
          }}
        >
          <Fab color="primary" onClick={handleFormOpen}>
            <AddIcon />
          </Fab>
        </Box>
      </Box>

      <Box>
        <Typography className="2xl:mt-10 mb-4 ml-4 text-3xl">Users</Typography>
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
          component={Paper}
          className="table_wrapper max-h-[63vh] border border-[#2F96E1]"
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow style={{ backgroundColor: "#34d399", height: "35px" }}>
                {userTableHeading?.map((row, index) => (
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textWrap: "nowrap",
                      backgroundColor: "#34d399",
                      color: "white",
                    }}
                    key={index}
                    align="left"
                    className="Heading-Fonts"
                  >
                    {row}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(userData && rowsPerPage > 0
                ? userData?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : userData
              ).map((row, index) => (
                <TableRow
                  key={index}
                  className={`${index % 2 ? "bg-[#E3F3FF]" : "bg-white"} `}
                >
                  <TableCell
                    sx={{ textWrap: "nowrap" }}
                    component="th"
                    scope="row"
                  >
                    {row?.fullName?.split("")?.join("")}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.email?.split(",")?.join(", ")}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Switch
                      checked={row?.isActive}
                      onChange={(event) => handleStatusChange(event, row?._id)}
                      disabled={userDetails?._id == row?._id ? true : false}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.isAdmin === true ? "Admin" : "User"}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.lastLoggedInOn}
                  </TableCell>
                  {userDetails.isAdmin ? (
                    <TableCell component="th" scope="row">
                      <EditIcon
                        onClick={() => {
                          setUserEditData(row);
                          handleFormOpen();
                        }}
                        sx={{
                          color: blue[800],
                          cursor: "pointer",
                          pointerEvents:
                            userDetails?._id == row?._id ? "none" : "all",
                          opacity: userDetails?._id == row?._id ? 0.4 : 1,
                        }}
                        disabled={userDetails?._id == row?._id ? true : false}
                      />
                    </TableCell>
                  ) : (
                    <></>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          count={userData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="place-self-center place-self-end w-[10%]"
        />
      </Paper>
    </>
  );
}
