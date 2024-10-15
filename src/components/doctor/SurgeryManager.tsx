import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface Doctor {
  id: number;
  name: string;
}

interface Surgery {
  id: number;
  doctorId: number;
  patientName: string;
  date: string;
  time: string;
  duration: number;
}

interface SurgeryManagerProps {
  doctors: Doctor[];
  surgeries: Surgery[];
  onAddSurgery: (surgery: Omit<Surgery, "id">) => void;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
}));

const SurgeryManager: React.FC<SurgeryManagerProps> = ({
  doctors,
  surgeries,
  onAddSurgery,
}) => {
  const [doctorId, setDoctorId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (doctorId && patientName && date && time && duration) {
      onAddSurgery({
        doctorId: Number(doctorId),
        patientName,
        date,
        time,
        duration: Number(duration),
      });
      setDoctorId("");
      setPatientName("");
      setDate("");
      setTime("");
      setDuration("");
      setSnackbar({
        open: true,
        message: "Surgery scheduled successfully!",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Please fill in all fields.",
        severity: "error",
      });
    }
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value));
    setDuration(value.toString());
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
    <Box>
      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom>
          Schedule Surgery
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Doctor</InputLabel>
                <Select
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value as string)}
                  label="Doctor"
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Patient Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Duration (minutes)"
                type="number"
                value={duration}
                onChange={handleDurationChange}
                inputProps={{ min: "1" }}
                error={Number(duration) < 0}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button type="submit" variant="contained" fullWidth>
                Schedule Surgery
              </Button>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>

      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom>
          Scheduled Surgeries
        </Typography>
        {surgeries.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No surgeries scheduled yet.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Patient</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {surgeries.map((surgery) => (
                  <TableRow key={surgery.id}>
                    <TableCell>
                      {doctors.find((d) => d.id === surgery.doctorId)?.name}
                    </TableCell>
                    <TableCell>{surgery.patientName}</TableCell>
                    <TableCell>{surgery.date}</TableCell>
                    <TableCell>{surgery.time}</TableCell>
                    <TableCell>{surgery.duration} minutes</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </StyledPaper>

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
    </Box>
  );
};

export default SurgeryManager;
