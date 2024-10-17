import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./components/AdminLayout";
import DepartmentPage from "./pages/DepartmentManagementPage";
import RoomManagementPage from "./pages/RoomManagementPage";
import DoctorManagementPage from "./pages/DoctorManagementPage";
import ServicesPage from "./pages/ServicesPage";
import PatientAdmissionPage from "./pages/PatientAdmissionPage";
import SurgicalOperationPage from "./pages/SurgicalOperationPage";
import RoomTrackingPage from "./pages/RoomTrackingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Layout>
          <AdminLayout title="Dashboard">
            <DashboardPage />
          </AdminLayout>
        </Layout>
      </>
    ),
  },
  {
    path: "/department",
    element: (
      <Layout>
        <AdminLayout title="Department Management">
          <DepartmentPage />
        </AdminLayout>
      </Layout>
    ),
  },
  {
    path: "/rooms",
    element: (
      <Layout>
        <AdminLayout title="Room Management">
          <RoomManagementPage />
        </AdminLayout>
      </Layout>
    ),
  },
  {
    path: "/doctors",
    element: (
      <Layout>
        <AdminLayout title="Doctor Management">
          <DoctorManagementPage />
        </AdminLayout>
      </Layout>
    ),
  },
  {
    path: "/services",
    element: (
      <Layout>
        <AdminLayout title="Services Management">
          <ServicesPage />
        </AdminLayout>
      </Layout>
    ),
  },
  {
    path: "/patients",
    element: (
      <Layout>
        <AdminLayout title="Patient Admission Management">
          <PatientAdmissionPage />
        </AdminLayout>
      </Layout>
    ),
  },
  {
    path: "/surgicals",
    element: (
      <Layout>
        <AdminLayout title="Surgical Operations Management">
          <SurgicalOperationPage />
        </AdminLayout>
      </Layout>
    ),
  },
  {
    path: "/roomstracking",
    element: (
      <Layout>
        <AdminLayout title="Rooms Tracking">
          <RoomTrackingPage />
        </AdminLayout>
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
]);
