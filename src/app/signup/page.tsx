import { Container } from "@mui/material"
import { SignUpForm } from "../auth/SignUpForm"


export default function SignInPage()
{
    return (
        <Container sx={{
            display: "flex",
            height: "100vh",
            alignItems: "center"
        }}>
            <SignUpForm/>
        </Container>
    )
}