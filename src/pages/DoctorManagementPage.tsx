import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import DoctorList from "../components/doctor/DoctorList";
import DoctorForm from "../components/doctor/DoctorForm";
import ScheduleManager from "../components/doctor/ScheduleManager";
import SurgeryManager from "../components/doctor/SurgeryManager";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

interface Shift {
  id: number;
  doctorId: number;
  day: string;
  startTime: string;
  endTime: string;
}

interface Surgery {
  id: number;
  doctorId: number;
  patientName: string;
  date: string;
  time: string;
  duration: number;
}

const DoctorManagementPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [surgeries, setSurgeries] = useState<Surgery[]>([]);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddDoctor = (doctor: Omit<Doctor, "id">) => {
    const newDoctor = { ...doctor, id: Date.now() };
    setDoctors([...doctors, newDoctor]);
  };

  const handleAddShift = (shift: Omit<Shift, "id">) => {
    const newShift = { ...shift, id: Date.now() };
    setShifts([...shifts, newShift]);
  };

  const handleAddSurgery = (surgery: Omit<Surgery, "id">) => {
    const newSurgery = { ...surgery, id: Date.now() };
    setSurgeries([...surgeries, newSurgery]);
  };

  return (
    <Box sx={{ maxWidth: 800, p: 2 }}>
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Doctors" />
        <Tab label="Schedules" />
        <Tab label="Surgeries" />
      </Tabs>

      {tabValue === 0 && (
        <Box>
          <DoctorForm onAddDoctor={handleAddDoctor} />
          <DoctorList doctors={doctors} />
        </Box>
      )}
      {tabValue === 1 && (
        <ScheduleManager
          doctors={doctors}
          shifts={shifts}
          onAddShift={handleAddShift}
        />
      )}
      {tabValue === 2 && (
        <SurgeryManager
          doctors={doctors}
          surgeries={surgeries}
          onAddSurgery={handleAddSurgery}
        />
      )}
    </Box>
  );
};

export default DoctorManagementPage;
