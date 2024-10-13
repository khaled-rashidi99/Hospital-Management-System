import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface RegisterFormData {
  fullName: string;
  birthdate: string;
  gender: string;
  address: string;
  username: string;
  password: string;
  confirmPassword: string;
  medicalHistory: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    birthdate: "",
    gender: "",
    address: "",
    username: "",
    password: "",
    confirmPassword: "",
    medicalHistory: "",
  });

  const initialFormData: RegisterFormData = {
    fullName: "",
    birthdate: "",
    gender: "",
    address: "",
    username: "",
    password: "",
    confirmPassword: "",
    medicalHistory: "",
  };
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => value === "")) {
      setError("Please fill in all fields");
    } else if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
    } else {
      console.log("Sign up attempt:", formData);
      setError(null);
      // API call here to register the user
    }
    setFormData(initialFormData);
    alert("Form submitted successfully!");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
        id="fullName"
        label="Full Name"
        name="fullName"
        autoComplete="name"
        autoFocus
        value={formData.fullName}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="birthdate"
        label="Birthdate"
        name="birthdate"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.birthdate}
        onChange={handleChange}
      />
      <Box sx={{ mt: 2, mb: 1 }}>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          row
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </Box>
      <TextField
        margin="normal"
        required
        fullWidth
        id="address"
        label="Address"
        name="address"
        multiline
        rows={2}
        value={formData.address}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        value={formData.username}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        id="password"
        autoComplete="new-password"
        value={formData.password}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type={showPassword ? "text" : "password"}
        id="confirmPassword"
        autoComplete="new-password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="medicalHistory"
        label="Medical History"
        multiline
        rows={4}
        value={formData.medicalHistory}
        onChange={handleChange}
      />
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
}
