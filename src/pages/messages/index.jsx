import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TableLoader from "../../components/TableLoader";
import { getAllUsers } from "../../services/chat.service";
import { socket } from "../../services/socket";

export default function Messages() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formOpen, setFormOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userData, setUserData] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "");
  // const { userData, setUserData } = useContext(AppContext)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!socket) return;
    console.log("here");
    // Listen for incoming messages
    socket.on("chats", async (msg) => {
      getAllUsersList();
    });
    // Clean up on component unmount
    return () => {
      socket.off("chats");
    };
  }, [socket]);
  const getAllUsersList = async () => {
    const resp = await getAllUsers();
    if (resp?.status === 200) {
      setLoading(false);
      setUserData(resp?.data);
      resp.data.map((ele) => {
        socket.emit("join_room", { roomId: ele?.roomId });
      });
    }
  };
  const userTableHeading = ["Full Name", "Last Messages", "Time"];
  useEffect(() => {
    getAllUsersList();
    if (!userDetails?.isAdmin) {
      navigate("/projects");
    }
  }, []);

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

  return (
    <>
      {loading && <TableLoader />}

      <Box>
        <Typography className="mt-10 mb-4 ml-4 text-3xl">Messages</Typography>
      </Box>

      <TableContainer
        component={Paper}
        className="table_wrapper border border-[#2F96E1]"
      >
        <Table>
          <TableHead>
            <TableRow>
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
            ).map(
              (row, index) =>
                row?.lastMessage && (
                  <TableRow
                    key={index}
                    onClick={() =>
                      navigate(`/support/${row._id}`, {
                        state: { roomId: row?.roomId },
                      })
                    }
                    className={`${index % 2 ? "bg-[#E3F3FF]" : "bg-white"} `}
                  >
                    <TableCell
                      sx={{ textWrap: "nowrap" }}
                      component="th"
                      scope="row"
                    >
                      {row?.owner_Name?.split("").join("")}
                    </TableCell>

                    <TableCell
                      component="th"
                      scope="row"
                      className={`items-center flex`}
                      style={{ fontWeight: row?.seenByAdmin ? "normal" : "600" }}
                    >
                      {row?.lastMessage}
                      {!row.seenByAdmin && (
                        <div className="bg-black w-2 h-2 ml-4 rounded-full "></div>
                      )}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {row?.lasteMessage_Date?.split(" ").slice(1).join(" ")}
                      &nbsp;
                      {row?.lastMessage_Time?.split(":").slice(0, 2).join(":")}
                      {row?.lastMessage_Time?.split(" ")[1]}
                    </TableCell>
                  </TableRow>
                )
            )}

            <TablePagination
              rowsPerPageOptions={[10, 20, 50]}
              count={userData?.filter((ele) => ele?.lastMessage)?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
