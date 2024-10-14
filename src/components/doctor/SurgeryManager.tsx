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
} from "@mui/material";

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
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Schedule Surgery
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
        <FormControl sx={{ mr: 1, minWidth: 120 }}>
          <InputLabel>Doctor</InputLabel>
          <Select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value as string)}
          >
            {doctors.map((doctor) => (
              <MenuItem key={doctor.id} value={doctor.id}>
                {doctor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          sx={{ mr: 1 }}
        />
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ mr: 1 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          sx={{ mr: 1 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Duration (minutes)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          sx={{ mr: 1 }}
        />
        <Button type="submit" variant="contained">
          Schedule Surgery
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Scheduled Surgeries
      </Typography>
      {surgeries.map((surgery) => (
        <Box key={surgery.id} sx={{ mb: 1 }}>
          <Typography>
            {doctors.find((d) => d.id === surgery.doctorId)?.name} -{" "}
            {surgery.patientName}({surgery.date} at {surgery.time},{" "}
            {surgery.duration} minutes)
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default SurgeryManager;
