import { Container } from "@mui/material"
import { SignInForm } from "../auth/SignInForm"


export default function SignInPage()
{
    return (
        <Container sx={{
            display: "flex",
            height: "100vh",
            alignItems: "center"
        }}>
            <SignInForm/>
        </Container>
    )
}