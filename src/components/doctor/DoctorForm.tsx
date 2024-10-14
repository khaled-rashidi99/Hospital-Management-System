import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

interface DoctorFormProps {
  onAddDoctor: (doctor: { name: string; specialty: string }) => void;
}

const DoctorForm: React.FC<DoctorFormProps> = ({ onAddDoctor }) => {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && specialty) {
      onAddDoctor({ name, specialty });
      setName("");
      setSpecialty("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mb: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextField
        fullWidth
        label="Doctor Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mr: 1, maxWidth: "300px" }}
      />
      <TextField
        label="Specialty"
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
        sx={{ mr: 1 }}
      />
      <Button type="submit" variant="contained">
        Add Doctor
      </Button>
    </Box>
  );
};

export default DoctorForm;
