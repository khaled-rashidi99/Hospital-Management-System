import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

interface Room {
  id: number;
  number: string;
  status: "occupied" | "vacant" | "under maintenance";
  patientName: string | null;
}

const RoomManagementPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [newRoomNumber, setNewRoomNumber] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [patientName, setPatientName] = useState("");

  const handleAddRoom = () => {
    if (newRoomNumber.trim()) {
      const newRoom: Room = {
        id: Date.now(),
        number: newRoomNumber.trim(),
        status: "vacant",
        patientName: null,
      };
      setRooms([...rooms, newRoom]);
      setNewRoomNumber("");
    }
  };

  const handleStatusChange = (roomId: number, newStatus: Room["status"]) => {
    setRooms(
      rooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              status: newStatus,
              patientName: newStatus !== "occupied" ? null : room.patientName,
            }
          : room
      )
    );
  };

  const handleOpenDialog = (room: Room) => {
    setSelectedRoom(room);
    setPatientName(room.patientName || "");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRoom(null);
    setPatientName("");
  };

  const handleAssignRoom = () => {
    if (selectedRoom && patientName.trim()) {
      setRooms(
        rooms.map((room) =>
          room.id === selectedRoom.id
            ? { ...room, status: "occupied", patientName: patientName.trim() }
            : room
        )
      );
      handleCloseDialog();
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", p: 2 }}>
      <Box sx={{ display: "flex", mb: 2 }}>
        <TextField
          label="New Room Number"
          variant="outlined"
          value={newRoomNumber}
          onChange={(e) => setNewRoomNumber(e.target.value)}
          sx={{ mr: 1 }}
        />
        <Button variant="contained" onClick={handleAddRoom}>
          Add Room
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Room Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.number}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Select
                      value={room.status}
                      onChange={(e) =>
                        handleStatusChange(
                          room.id,
                          e.target.value as Room["status"]
                        )
                      }
                    >
                      <MenuItem value="vacant">Vacant</MenuItem>
                      <MenuItem value="occupied">Occupied</MenuItem>
                      <MenuItem value="under maintenance">
                        Under Maintenance
                      </MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>{room.patientName || "N/A"}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenDialog(room)}
                    disabled={room.status !== "vacant"}
                  >
                    Assign Patient
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Assign Patient to Room</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Patient Name"
            type="text"
            fullWidth
            variant="standard"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAssignRoom}>Assign</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoomManagementPage;
