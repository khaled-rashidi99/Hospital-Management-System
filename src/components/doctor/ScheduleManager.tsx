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

interface Shift {
  id: number;
  doctorId: number;
  day: string;
  startTime: string;
  endTime: string;
}

interface ScheduleManagerProps {
  doctors: Doctor[];
  shifts: Shift[];
  onAddShift: (shift: Omit<Shift, "id">) => void;
}

const ScheduleManager: React.FC<ScheduleManagerProps> = ({
  doctors,
  shifts,
  onAddShift,
}) => {
  const [doctorId, setDoctorId] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (doctorId && day && startTime && endTime) {
      onAddShift({ doctorId: Number(doctorId), day, startTime, endTime });
      setDoctorId("");
      setDay("");
      setStartTime("");
      setEndTime("");
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Add Shift
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
          label="Day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          sx={{ mr: 1 }}
        />
        <TextField
          label="Start Time"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          sx={{ mr: 1 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Time"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          sx={{ mr: 1 }}
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained">
          Add Shift
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Current Shifts
      </Typography>
      {shifts.map((shift) => (
        <Box key={shift.id} sx={{ mb: 1 }}>
          <Typography>
            {doctors.find((d) => d.id === shift.doctorId)?.name} - {shift.day} (
            {shift.startTime} - {shift.endTime})
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ScheduleManager;
