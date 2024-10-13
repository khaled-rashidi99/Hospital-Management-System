import { useState } from "react";
import { Box, Typography, Avatar, Button, Paper } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/login/RegisterForm";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "400px",
          width: "100%",
          p: 3,
          borderRadius: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          {isLogin ? "iHMS App Login" : "iHMS App Register"}
        </Typography>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <Button onClick={toggleForm} variant="text" sx={{ mt: 2 }}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </Button>
      </Paper>
    </Box>
  );
}
