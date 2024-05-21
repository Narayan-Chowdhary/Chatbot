import { React, useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  Typography,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { allDocuments, deleteDocument } from "../../services/documents.service";
import AddNewDocument from "../../components/AddNewDocument";
// import DeleteIcon from '@mui/icons-material/Delete';
import DeleteIcon from '../../assets/images/DeleteIcon.png'
import DeletePopUp from "../../components/common/DeletePopUp";
import { AppContext } from "../../store/store.context";
import TableLoader from "../../components/TableLoader";


export default function Documents() {

  const navigate = useNavigate();
  const location = useLocation()
  const [formOpen, setFormOpen] = useState(false)
  const [role, setRole] = useState(null)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deletePopUpOpen, setDeletePopUpOpen] = useState(false)
  const [docTitle, setDocTitle] = useState('')
  const [docDetails, setDocDetails] = useState('')
  const documentTableHeading = role == 'admin' ? ["Title", "Tags", "Date", "Action"] : ["Title", "Tags", "Date"]
  const { documentData, setDocumentData } = useContext(AppContext)
  const [loading, setLoading] = useState(true)


  const fetchData = async () => {
    try {
      const response = await allDocuments()
      if (response && response?.data) {
        setDocumentData(response?.data);
        setLoading(false)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("userDetails"))
    setRole(item?.isAdmin ? 'admin' : 'user')
  }, []);

  useEffect(() => {
    fetchData()
  }, [page, rowsPerPage, location, location?.pathname])

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

  const handleDocumentDelete = async () => {
    const res = await deleteDocument(docDetails?._id)
    setDeletePopUpOpen(false)
    fetchData()
  }

  return (
    <>
      {loading && <TableLoader />}

      <AddNewDocument
        formOpen={formOpen}
        setFormOpen={setFormOpen}
        fetchData={fetchData}
      />

      <DeletePopUp
        heading="Delete Document"
        text={`Are you sure you want to delete ${docTitle}`}
        showOpen={deletePopUpOpen}
        cancelCallback={setDeletePopUpOpen}
        confirmCallback={handleDocumentDelete}
      />

      <Box sx={{ marginBottom: '12px' }}>
        {role === "admin" ?
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
          </Box> : <></>
        }
      </Box>
      <Box>
        <Typography className="2xl:mt-10 mb-4 ml-4 text-3xl">Documents</Typography>
      </Box>

      <TableContainer component={Paper} className="table_wrapper max-h-[70vh] border border-[#2F96E1]" >
        <Table stickyHeader>
          <TableHead>
            <TableRow style={{ 'backgroundColor': '#34d399', "height": '35px' }}>
              {documentTableHeading?.map((row, index) => (
                <TableCell sx={{ fontWeight: 'bold', textWrap: 'nowrap', backgroundColor: "#34d399", color: "white" }} key={index} align="left" className="Heading-Fonts">
                  {row}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(documentData && rowsPerPage > 0
              ? documentData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : documentData
            ).map((row, index) => (
              <TableRow
                key={index} className={`${index % 2 ? "bg-[#E3F3FF]" : "bg-white"} `}>
                <TableCell sx={{ textWrap: 'nowrap' }} component="th" scope="row" >
                  <Box
                    style={{
                      textDecoration: "none",
                      color: "#2196f3",
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/documents/${row?.title}`, {
                        state: JSON.stringify({
                          doc_url: row?.path,
                        }),
                      });
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        fontSize: "16px",
                        "&:hover": {
                          textDecoration: "underline",
                          cursor: 'pointer',
                        },
                      }}
                    >
                      {/* <Box sx={{ color: "#34d399", mr: 2 }}>
                        <SmartToyIcon />
                      </Box> */}
                      <Box className="sub-heading-fonts">{row?.title}</Box>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ minWidth: 150 }} component="th" scope="row">
                  {row?.tags?.split(',').join(', ')}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.date}
                </TableCell>
                {role === 'admin' && <TableCell component="th" scope="row">
                  <Box>
                    <img src={DeleteIcon} alt="delete-icon"
                      className="cursor-pointer"
                      onClick={() => { setDeletePopUpOpen(true); setDocTitle(row?.title); setDocDetails(row) }}
                      sx={{
                        color: '#34d399',
                      }} />
                    {/* onClick={() => { setDeletePopUpOpen(true); setDocTitle(row.title); setDocDetails(row) }}
                      sx={{
                        color: '#34d399',
                        cursor: "pointer",
                      }} */}

                  </Box>
                </TableCell>

                }
              </TableRow>
            ))}
            <TablePagination
              rowsPerPageOptions={[10, 20, 50]}
              count={documentData?.length}
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
