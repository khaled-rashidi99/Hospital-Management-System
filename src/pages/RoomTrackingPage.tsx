import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface Room {
  id: number;
  number: string;
  department: string;
  status: "Available" | "Occupied" | "Maintenance";
  patient?: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StatusCard = styled(Card)<{ status: string }>(({ theme, status }) => ({
  height: "100%",
  backgroundColor:
    status === "Available"
      ? theme.palette.success.light
      : status === "Occupied"
      ? theme.palette.warning.light
      : theme.palette.error.light,
}));

const RoomTrackingPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [newStatus, setNewStatus] = useState<Room["status"]>("Available");
  const [patientName, setPatientName] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as const,
  });

  useEffect(() => {
    const sampleRooms: Room[] = [
      { id: 1, number: "101", department: "Cardiology", status: "Available" },
      {
        id: 2,
        number: "102",
        department: "Cardiology",
        status: "Occupied",
        patient: "John Doe",
      },
      { id: 3, number: "201", department: "Neurology", status: "Available" },
      { id: 4, number: "202", department: "Neurology", status: "Maintenance" },
      { id: 5, number: "301", department: "Oncology", status: "Available" },
      {
        id: 6,
        number: "302",
        department: "Oncology",
        status: "Occupied",
        patient: "Jane Smith",
      },
    ];
    setRooms(sampleRooms);
    setFilteredRooms(sampleRooms);
    const uniqueDepartments = Array.from(
      new Set(sampleRooms.map((room) => room.department))
    );
    setDepartments(uniqueDepartments);
  }, []);

  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    if (department === "All") {
      setFilteredRooms(rooms);
    } else {
      setFilteredRooms(rooms.filter((room) => room.department === department));
    }
  };

  const handleStatusUpdate = (room: Room) => {
    setSelectedRoom(room);
    setNewStatus(room.status);
    setPatientName(room.patient || "");
    setDialogOpen(true);
  };

  const handleStatusChange = (event: SelectChangeEvent<Room["status"]>) => {
    setNewStatus(event.target.value as Room["status"]);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedRoom(null);
    setNewStatus("Available");
    setPatientName("");
  };

  const handleStatusSave = () => {
    if (selectedRoom) {
      const updatedRooms = rooms.map((room) =>
        room.id === selectedRoom.id
          ? {
              ...room,
              status: newStatus,
              patient: newStatus === "Occupied" ? patientName : undefined,
            }
          : room
      );
      setRooms(updatedRooms);
      setFilteredRooms(
        selectedDepartment === "All"
          ? updatedRooms
          : updatedRooms.filter(
              (room) => room.department === selectedDepartment
            )
      );
      setSnackbar({
        open: true,
        message: "Room status updated successfully",
        severity: "success",
      });
      handleDialogClose();
    }
  };

  const handleSnackbarClose = (
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
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Filter by Department</InputLabel>
          <Select
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            label="Filter by Department"
          >
            <MenuItem value="All">All Departments</MenuItem>
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container spacing={3}>
          {filteredRooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <StatusCard status={room.status}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Room {room.number}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {room.department}
                  </Typography>
                  <Typography variant="body2">
                    Status: {room.status}
                    {room.patient && (
                      <>
                        <br />
                        Patient: {room.patient}
                      </>
                    )}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleStatusUpdate(room)}>
                    Update Status
                  </Button>
                </CardActions>
              </StatusCard>
            </Grid>
          ))}
        </Grid>
      </StyledPaper>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Update Room Status</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={newStatus}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Occupied">Occupied</MenuItem>
              <MenuItem value="Maintenance">Maintenance</MenuItem>
            </Select>
          </FormControl>
          {newStatus === "Occupied" && (
            <TextField
              margin="dense"
              label="Patient Name"
              type="text"
              fullWidth
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleStatusSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RoomTrackingPage;
