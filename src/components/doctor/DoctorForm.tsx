import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  useMediaQuery,
  Theme,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface DoctorFormProps {
  onAddDoctor: (doctor: { name: string; specialty: string }) => void;
}

const DoctorForm: React.FC<DoctorFormProps> = ({ onAddDoctor }) => {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && specialty) {
      onAddDoctor({ name, specialty });
      setName("");
      setSpecialty("");
      setSnackbar({
        open: true,
        message: "Doctor added successfully!",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Please fill in both name and specialty.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = (
    _?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          label="Doctor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ maxWidth: isSmallScreen ? "100%" : "300px" }}
        />
        <TextField
          fullWidth
          label="Specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          sx={{ maxWidth: isSmallScreen ? "100%" : "300px" }}
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            width: isSmallScreen ? "100%" : "auto",
            alignSelf: isSmallScreen ? "stretch" : "center",
          }}
        >
          Add Doctor
        </Button>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DoctorForm;
