'use client';

import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

interface AuthFormProperties
{
    primaryText: string;
    secondaryText: string;
    secondaryButtonText: string;
    onSubmit: (formData: FormData) => void;
    error: string;
    onSecondaryButtonClick: () => void;
}

export interface FormData
{
    email: string;
    password: string;
}

export const AuthForm = ({primaryText, secondaryText, onSubmit, error, secondaryButtonText, onSecondaryButtonClick}: AuthFormProperties) =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({email: email, password: password});
    };

    return (
        <Container maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 4,
              p: 2,
              border: '1px solid #ddd',
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h4" gutterBottom sx={{color: "#80EFFF"}}>
              {primaryText}
            </Typography>
    
            {error && <Typography color="error" variant="body2">{error}</Typography>}
    
            <form style={{ width: '100%' }}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#222", // Dark gray background for the input field itself
                      color: "#00FFFF", // Cyan text color
                      "& fieldset": {
                        borderColor: "#80EFFF", // Light cyan border
                      },
                      "&:hover fieldset": {
                        borderColor: "#00FFFF", // Brighter cyan on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#00FFFF", // Focused border color
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#80EFFF", // Light cyan label color
                    },
                    "& .MuiInputBase-input": {
                      backgroundColor: "#222", // Dark background inside the input
                    },
                  }} 
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#222", // Dark gray background for the input field itself
                      color: "#00FFFF", // Cyan text color
                      "& fieldset": {
                        borderColor: "#80EFFF", // Light cyan border
                      },
                      "&:hover fieldset": {
                        borderColor: "#00FFFF", // Brighter cyan on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#00FFFF", // Focused border color
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#80EFFF", // Light cyan label color
                    },
                    "& .MuiInputBase-input": {
                      backgroundColor: "#222", // Dark background inside the input
                    },
                  }} 
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleSubmit}
              >
                {primaryText}
              </Button>

              <Typography variant="body1" sx={{marginTop: "16px"}}>
                  {secondaryText}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={onSecondaryButtonClick}
              >
                {secondaryButtonText}
              </Button>
            </form>
          </Box>
        </Container>
      );
}