import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  Paper,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

interface DoctorListProps {
  doctors: Doctor[];
}

const StyledListItem = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const DoctorList: React.FC<DoctorListProps> = ({ doctors }) => {
  return (
    <Paper elevation={3}>
      <Box sx={{ p: 2, bgcolor: "background.paper" }}>
        <Typography variant="h6" gutterBottom component="div">
          Doctors List
        </Typography>
        {doctors.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ py: 2 }}>
            No doctors added yet.
          </Typography>
        ) : (
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {doctors.map((doctor, index) => (
              <React.Fragment key={doctor.id}>
                <StyledListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <StyledAvatar>
                      <LocalHospitalIcon />
                    </StyledAvatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={doctor.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Specialty:
                        </Typography>
                        {` ${doctor.specialty}`}
                      </React.Fragment>
                    }
                  />
                </StyledListItem>
                {index < doctors.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Paper>
  );
};

export default DoctorList;
