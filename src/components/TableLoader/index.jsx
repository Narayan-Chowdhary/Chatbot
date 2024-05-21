
import { Box, CircularProgress } from "@mui/material";

export default function TableLoader() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    );
}