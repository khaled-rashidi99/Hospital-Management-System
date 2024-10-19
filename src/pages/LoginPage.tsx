import { Box, Typography, Avatar, Paper } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginForm from "../components/login/LoginForm";

export default function LoginPage() {
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
          iHMS App Login
        </Typography>
        <LoginForm />
      </Paper>
    </Box>
  );
}
