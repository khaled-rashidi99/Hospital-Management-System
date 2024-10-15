import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  SelectChangeEvent,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

interface Patient {
  id: number;
  name: string;
  roomNumber: string;
  admissionDate: string;
  services: string[];
}

interface Room {
  number: string;
  isOccupied: boolean;
}

interface Service {
  id: string;
  name: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const PatientAdmissionPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [rooms] = useState<Room[]>([
    { number: "101", isOccupied: false },
    { number: "102", isOccupied: false },
    { number: "103", isOccupied: false },
  ]);
  const [services] = useState<Service[]>([
    { id: "1", name: "Medical Imaging" },
    { id: "2", name: "Laboratory Tests" },
    { id: "3", name: "Medical Interventions" },
  ]);
  const [newPatient, setNewPatient] = useState({
    name: "",
    roomNumber: "",
    services: [] as string[],
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoomChange = (e: SelectChangeEvent<string>) => {
    setNewPatient((prev) => ({
      ...prev,
      roomNumber: e.target.value,
    }));
  };

  const handleServiceChange = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value;
    setNewPatient((prev) => ({
      ...prev,
      services: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleAdmitPatient = () => {
    if (newPatient.name && newPatient.roomNumber) {
      const admissionDate = new Date().toISOString().split("T")[0];
      const newPatientEntry: Patient = {
        id: Date.now(),
        name: newPatient.name,
        roomNumber: newPatient.roomNumber,
        admissionDate,
        services: newPatient.services,
      };
      setPatients((prev) => [...prev, newPatientEntry]);
      setNewPatient({ name: "", roomNumber: "", services: [] });
      setSnackbar({
        open: true,
        message: "Patient admitted successfully",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields",
        severity: "error",
      });
    }
  };

  const handleOpenDischargeDialog = (patient: Patient) => {
    setSelectedPatient(patient);
    setOpenDialog(true);
  };

  const handleDischargePatient = () => {
    if (selectedPatient) {
      setPatients((prev) => prev.filter((p) => p.id !== selectedPatient.id));
      setOpenDialog(false);
      setSnackbar({
        open: true,
        message: "Patient discharged successfully",
        severity: "success",
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
    <Container maxWidth="lg">
      <StyledPaper elevation={3}>
        <Typography variant="h6" gutterBottom>
          Admit New Patient
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Patient Name"
              name="name"
              value={newPatient.name}
              onChange={handleInputChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" required>
              <InputLabel>Room</InputLabel>
              <Select
                value={newPatient.roomNumber}
                onChange={handleRoomChange}
                label="Room"
              >
                {rooms
                  .filter((room) => !room.isOccupied)
                  .map((room) => (
                    <MenuItem key={room.number} value={room.number}>
                      Room {room.number}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Services</InputLabel>
              <Select
                multiple
                value={newPatient.services}
                onChange={handleServiceChange}
                label="Services"
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(selected as string[]).map((value) => (
                      <Chip
                        key={value}
                        label={services.find((s) => s.id === value)?.name}
                      />
                    ))}
                  </Box>
                )}
              >
                {services.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleAdmitPatient}
              startIcon={<AddIcon />}
            >
              Admit Patient
            </Button>
          </Grid>
        </Grid>
      </StyledPaper>

      <StyledPaper elevation={3}>
        <Typography variant="h6" gutterBottom>
          Current Patients
        </Typography>
        {patients.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No patients currently admitted.
          </Typography>
        ) : (
          <List>
            {patients.map((patient) => (
              <ListItem key={patient.id} divider>
                <ListItemText
                  primary={patient.name}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Room: {patient.roomNumber} | Admitted:{" "}
                        {patient.admissionDate}
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        Services:{" "}
                        {patient.services
                          .map(
                            (s) => services.find((serv) => serv.id === s)?.name
                          )
                          .join(", ")}
                      </Typography>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="discharge"
                    onClick={() => handleOpenDischargeDialog(patient)}
                  >
                    <ExitToAppIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </StyledPaper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Discharge Patient</DialogTitle>
        <DialogContent>
          Are you sure you want to discharge {selectedPatient?.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDischargePatient} color="primary">
            Discharge
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PatientAdmissionPage;
