import { AppBar, Button, Toolbar } from "@mui/material"
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../../firebase";

export const TopBar = () =>
{
    const handleLogout = async () =>
    {
        await signOut(firebaseAuth);
    };

    return (
        <AppBar sx={{background: "transparent", position: "static", boxShadow: 0, alignItems: "end"}} >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 1}}>
                <Button variant="contained" onClick={handleLogout} sx={{background: "#80EFFF", color: "black"}}>
                    Sign Out
                </Button>
            </Toolbar>
        </AppBar>
    )
}