import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  SelectChangeEvent,
  Chip,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";

interface Service {
  id: number;
  name: string;
  category: "imaging" | "laboratory" | "intervention";
  description: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: "bold",
}));

const EmptyStateBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState<Omit<Service, "id">>({
    name: "",
    category: "imaging",
    description: "",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewService((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (
    e: SelectChangeEvent<"imaging" | "laboratory" | "intervention">
  ) => {
    setNewService((prev) => ({
      ...prev,
      category: e.target.value as "imaging" | "laboratory" | "intervention",
    }));
  };

  const handleAddService = () => {
    if (newService.name && newService.category) {
      setServices((prev) => [...prev, { ...newService, id: Date.now() }]);
      setNewService({ name: "", category: "imaging", description: "" });
    }
  };

  const handleDeleteService = (id: number) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
  };

  const categoryLabels = {
    imaging: "Medical Imaging",
    laboratory: "Laboratory Tests",
    intervention: "Medical Interventions",
  };

  return (
    <Container maxWidth="lg">
      <StyledPaper elevation={3}>
        <Typography variant="h6" gutterBottom>
          Add New Service
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Service Name"
              name="name"
              value={newService.name}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={newService.category}
                onChange={handleCategoryChange}
                label="Category"
              >
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={newService.description}
              onChange={handleInputChange}
              multiline
              rows={3}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleAddService}
              startIcon={<AddIcon />}
            >
              Add Service
            </Button>
          </Grid>
        </Grid>
      </StyledPaper>

      <StyledPaper elevation={3}>
        <Typography variant="h6" gutterBottom>
          Available Services
        </Typography>
        {services.length === 0 ? (
          <EmptyStateBox>
            <Typography variant="body1">No available services</Typography>
          </EmptyStateBox>
        ) : (
          Object.entries(categoryLabels).map(([category, label]) => {
            const categoryServices = services.filter(
              (service) => service.category === category
            );
            if (categoryServices.length === 0) return null;

            return (
              <Box key={category} mb={4}>
                <CategoryChip label={label} color="primary" />
                <List disablePadding>
                  {categoryServices.map((service) => (
                    <React.Fragment key={service.id}>
                      <ListItem
                        alignItems="flex-start"
                        sx={{
                          flexDirection: isMobile ? "column" : "row",
                          py: 2,
                          px: 3,
                          backgroundColor: "background.paper",
                          "&:hover": {
                            backgroundColor: "action.hover",
                          },
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" component="div">
                              {service.name}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              component="div"
                            >
                              {service.description}
                            </Typography>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteService(service.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            );
          })
        )}
      </StyledPaper>
    </Container>
  );
};

export default ServicesPage;
