import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const LoadingPage = () =>
{
    return (
        <Box sx={{display: "flex", width: "100vw", height: "100vh", alignItems: "center", justifyContent: "center"}}>
            <CircularProgress
                sx={{color: "#80EFFF"}}
                size={100}/>
        </Box>
    )
}