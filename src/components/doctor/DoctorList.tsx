import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

interface DoctorListProps {
  doctors: Doctor[];
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors }) => {
  return (
    <List>
      {doctors.map((doctor) => (
        <ListItem key={doctor.id}>
          <ListItemText primary={doctor.name} secondary={doctor.specialty} />
        </ListItem>
      ))}
    </List>
  );
};

export default DoctorList;
