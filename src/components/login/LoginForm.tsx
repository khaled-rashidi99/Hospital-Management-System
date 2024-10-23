import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { adminlogin } from "../../api/auth";
import { userlogin } from "../../api/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    console.log("Login attempt:", formData);
    setError(null);
    try {
      await adminlogin(
        {
          userName: formData.username,
          password: formData.password,
          passwordConfirmation: formData.password,
        },
        dispatch
      );
      alert("Logged in successfully, Admin!");
      setFormData({ username: "", password: "" });
      navigate("/");
    } catch (adminerror) {
      try {
        await userlogin(
          {
            userName: formData.username,
            password: formData.password,
            passwordConfirmation: formData.password,
          },
          dispatch
        );
        alert("Logged in successfully, User!");
        setFormData({ username: "", password: "" });
        navigate("/user/patients");
      } catch (usererror) {
        setError("Login failed. Please check your credentials and try again.");
        setFormData({ username: "", password: "" });
      }
    }

    return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, width: "100%" }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
        />
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    );
  };
}
