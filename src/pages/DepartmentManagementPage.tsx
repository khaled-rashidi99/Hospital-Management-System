import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface Department {
  id: number;
  name: string;
  rooms: number;
}

const DepartmentPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [newRoomCount, setNewRoomCount] = useState("");

  const handleAddDepartment = () => {
    if (newDepartmentName.trim()) {
      const newDepartment: Department = {
        id: Date.now(),
        name: newDepartmentName.trim(),
        rooms: 0,
      };
      setDepartments([...departments, newDepartment]);
      setNewDepartmentName("");
    }
  };

  const handleDeleteDepartment = (id: number) => {
    setDepartments(departments.filter((dept) => dept.id !== id));
  };

  const handleOpenDialog = (department: Department) => {
    setSelectedDepartment(department);
    setNewRoomCount(department.rooms.toString());
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDepartment(null);
    setNewRoomCount("");
  };

  const handleUpdateRooms = () => {
    if (selectedDepartment && !isNaN(Number(newRoomCount))) {
      setDepartments(
        departments.map((dept) =>
          dept.id === selectedDepartment.id
            ? { ...dept, rooms: Number(newRoomCount) }
            : dept
        )
      );
      handleCloseDialog();
    }
  };

  return (
    <Box sx={{ maxWidth: 600, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Hospital Departments
      </Typography>

      <Box sx={{ display: "flex", mb: 2 }}>
        <TextField
          label="New Department Name"
          variant="outlined"
          value={newDepartmentName}
          onChange={(e) => setNewDepartmentName(e.target.value)}
          fullWidth
          sx={{ mr: 1 }}
        />
        <Button
          variant="contained"
          onClick={handleAddDepartment}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </Box>

      <List>
        {departments.map((department) => (
          <ListItem key={department.id}>
            <ListItemText
              primary={department.name}
              secondary={`Available Rooms: ${department.rooms}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleOpenDialog(department)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteDepartment(department.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Room Count</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Number of Rooms"
            type="number"
            fullWidth
            variant="standard"
            value={newRoomCount}
            onChange={(e) => setNewRoomCount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateRooms}>Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DepartmentPage;
