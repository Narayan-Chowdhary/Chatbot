import React, { useState } from 'react';
import DocViewer from "@cyntler/react-doc-viewer";
import { useLocation } from 'react-router';
import { base_url } from '../../utils/_data/ApiEndPoints';
import { Document, Page } from 'react-pdf';
import { Box, Button } from "@mui/material";



export default function ViewDocuments() {
    const location = useLocation();

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const pdfFile = JSON.parse(location.state).doc_url

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const nextPage = () => {
        setPageNumber(prevPageNumber => (prevPageNumber < numPages ? prevPageNumber + 1 : prevPageNumber));
    };

    const previousPage = () => {
        setPageNumber(prevPageNumber => prevPageNumber - 1);
    };



    return (
        <div style={{}}>
            <Box style={{ display: 'flex', justifyContent: "space-around", marginTop: 20, marginBottom: 20 }}>
                <div >
                    <Button variant="outlined" disabled={pageNumber <= 1} onClick={previousPage} style={{ marginRight: 10 }}>
                        Previous
                    </Button>
                    <Button variant="contained" disabled={pageNumber >= numPages} onClick={nextPage} className='bg-[#34d399]'>
                        Next Page
                    </Button>
                </div>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </Box>
            <Document file={`${base_url}/${pdfFile}`} onLoadSuccess={onDocumentLoadSuccess} style={{ width: "50%", fontSize: '20px' }}>
                <Page pageNumber={pageNumber} />
            </Document>


        </div >


    );
}
