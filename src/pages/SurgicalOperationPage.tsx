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
  SelectChangeEvent,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface SurgicalOperation {
  id: number;
  patientName: string;
  operationType: string;
  date: string;
  time: string;
  duration: number;
  surgeonId: number;
  anesthesiologistId: number;
  nurseIds: number[];
}

interface MedicalStaff {
  id: number;
  name: string;
  role: "Surgeon" | "Anesthesiologist" | "Nurse";
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const SurgicalOperationPage: React.FC = () => {
  const [operations, setOperations] = useState<SurgicalOperation[]>([]);
  const [medicalStaff] = useState<MedicalStaff[]>([
    { id: 1, name: "Dr. Alaa", role: "Surgeon" },
    { id: 2, name: "Dr. Khaled", role: "Anesthesiologist" },
    { id: 3, name: "Nurse Ahmad", role: "Nurse" },
    { id: 4, name: "Nurse Mahmoud", role: "Nurse" },
  ]);
  const [newOperation, setNewOperation] = useState<
    Omit<SurgicalOperation, "id">
  >({
    patientName: "",
    operationType: "",
    date: "",
    time: "",
    duration: 60,
    surgeonId: 0,
    anesthesiologistId: 0,
    nurseIds: [],
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "duration") {
      const duration = Math.max(1, parseInt(value) || 1);
      setNewOperation((prev) => ({ ...prev, [name]: duration }));
    } else {
      setNewOperation((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleStaffChange = (
    e: SelectChangeEvent<number>,
    staffType: "surgeonId" | "anesthesiologistId"
  ) => {
    setNewOperation((prev) => ({
      ...prev,
      [staffType]: Number(e.target.value),
    }));
  };

  const handleNurseChange = (e: SelectChangeEvent<number[]>) => {
    const value = e.target.value;
    setNewOperation((prev) => ({
      ...prev,
      nurseIds:
        typeof value === "string" ? value.split(",").map(Number) : value,
    }));
  };

  const handleAddOperation = () => {
    if (
      newOperation.patientName &&
      newOperation.operationType &&
      newOperation.date &&
      newOperation.time &&
      newOperation.duration > 0 &&
      newOperation.surgeonId &&
      newOperation.anesthesiologistId
    ) {
      const newOperationEntry: SurgicalOperation = {
        ...newOperation,
        id: Date.now(),
      };
      setOperations((prev) => [...prev, newOperationEntry]);
      setNewOperation({
        patientName: "",
        operationType: "",
        date: "",
        time: "",
        duration: 60,
        surgeonId: 0,
        anesthesiologistId: 0,
        nurseIds: [],
      });
      setSnackbar({
        open: true,
        message: "Operation scheduled successfully",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields with valid values",
        severity: "error",
      });
    }
  };

  const handleDeleteOperation = (id: number) => {
    setOperations((prev) => prev.filter((op) => op.id !== id));
    setSnackbar({
      open: true,
      message: "Operation deleted successfully",
      severity: "success",
    });
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

  const isFormValid = () => {
    return (
      newOperation.patientName &&
      newOperation.operationType &&
      newOperation.date &&
      newOperation.time &&
      newOperation.duration > 0 &&
      newOperation.surgeonId &&
      newOperation.anesthesiologistId
    );
  };

  return (
    <Container maxWidth="lg">
      <StyledPaper elevation={3}>
        <Typography variant="h6" gutterBottom>
          Schedule New Operation
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Patient Name"
              name="patientName"
              value={newOperation.patientName}
              onChange={handleInputChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Operation Type"
              name="operationType"
              value={newOperation.operationType}
              onChange={handleInputChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={newOperation.date}
              onChange={handleInputChange}
              variant="outlined"
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Time"
              name="time"
              type="time"
              value={newOperation.time}
              onChange={handleInputChange}
              variant="outlined"
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Duration (minutes)"
              name="duration"
              type="number"
              value={newOperation.duration}
              onChange={handleInputChange}
              variant="outlined"
              required
              inputProps={{ min: 1 }}
              error={newOperation.duration <= 0}
              helperText={
                newOperation.duration <= 0
                  ? "Duration must be greater than 0"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" required>
              <InputLabel>Surgeon</InputLabel>
              <Select
                value={newOperation.surgeonId}
                onChange={(e) => handleStaffChange(e, "surgeonId")}
                label="Surgeon"
              >
                {medicalStaff
                  .filter((staff) => staff.role === "Surgeon")
                  .map((surgeon) => (
                    <MenuItem key={surgeon.id} value={surgeon.id}>
                      {surgeon.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" required>
              <InputLabel>Anesthesiologist</InputLabel>
              <Select
                value={newOperation.anesthesiologistId}
                onChange={(e) => handleStaffChange(e, "anesthesiologistId")}
                label="Anesthesiologist"
              >
                {medicalStaff
                  .filter((staff) => staff.role === "Anesthesiologist")
                  .map((anesthesiologist) => (
                    <MenuItem
                      key={anesthesiologist.id}
                      value={anesthesiologist.id}
                    >
                      {anesthesiologist.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Nurses</InputLabel>
              <Select
                multiple
                value={newOperation.nurseIds}
                onChange={handleNurseChange}
                label="Nurses"
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(selected as number[]).map((value) => (
                      <Chip
                        key={value}
                        label={medicalStaff.find((s) => s.id === value)?.name}
                      />
                    ))}
                  </Box>
                )}
              >
                {medicalStaff
                  .filter((staff) => staff.role === "Nurse")
                  .map((nurse) => (
                    <MenuItem key={nurse.id} value={nurse.id}>
                      {nurse.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleAddOperation}
              startIcon={<AddIcon />}
              disabled={!isFormValid()}
            >
              Schedule Operation
            </Button>
          </Grid>
        </Grid>
      </StyledPaper>

      <StyledPaper elevation={3}>
        <Typography variant="h6" gutterBottom>
          Scheduled Operations
        </Typography>
        {operations.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No operations scheduled.
          </Typography>
        ) : (
          <List>
            {operations.map((operation) => (
              <ListItem key={operation.id} divider>
                <ListItemText
                  primary={`${operation.patientName} - ${operation.operationType}`}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Date: {operation.date} | Time: {operation.time} |
                        Duration: {operation.duration} minutes
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        Surgeon:{" "}
                        {
                          medicalStaff.find((s) => s.id === operation.surgeonId)
                            ?.name
                        }
                        <br />
                        Anesthesiologist:{" "}
                        {
                          medicalStaff.find(
                            (s) => s.id === operation.anesthesiologistId
                          )?.name
                        }
                        <br />
                        Nurses:{" "}
                        {operation.nurseIds
                          .map(
                            (id) => medicalStaff.find((s) => s.id === id)?.name
                          )
                          .join(", ")}
                      </Typography>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteOperation(operation.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </StyledPaper>

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

export default SurgicalOperationPage;
