import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const fakeData = {
  patients: 450,
  activePatients: 125,
  dischargedPatients: 300,
  emergencyCases: 20,
  patientAdmissions: [20, 30, 25, 40, 50, 35, 60],
  patientNames: [
    { name: "John Doe", age: 45, condition: "Diabetes" },
    { name: "Jane Smith", age: 34, condition: "COVID-19" },
    { name: "Mark Wilson", age: 60, condition: "Heart Disease" },
    { name: "Anna Lee", age: 28, condition: "Pregnancy" },
    { name: "Sophia Brown", age: 50, condition: "Asthma" },
  ],
};

const Dashboard = () => {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Patient Admissions",
        data: fakeData.patientAdmissions,
        borderColor: "#3e95cd",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader title="Total Patients" />
              <CardContent>
                <Typography variant="h5">{fakeData.patients}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader title="Active Patients" />
              <CardContent>
                <Typography variant="h5">{fakeData.activePatients}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader title="Discharged Patients" />
              <CardContent>
                <Typography variant="h5">
                  {fakeData.dischargedPatients}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader title="Emergency Cases" />
              <CardContent>
                <Typography variant="h5">{fakeData.emergencyCases}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper>
              <CardHeader title="Patient Admissions Over Time" />
              <CardContent>
                <Line data={chartData} />
              </CardContent>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper>
              <CardHeader title="Recent Patients" />
              <CardContent>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                        Name
                      </th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                        Age
                      </th>
                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                        Condition
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fakeData.patientNames.map((patient, index) => (
                      <tr key={index}>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {patient.name}
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {patient.age}
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {patient.condition}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
