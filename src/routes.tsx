import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Layout from "./components/Layouts/Layout";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./components/Layouts/AdminLayout";
import DepartmentPage from "./pages/DepartmentManagementPage";
import RoomManagementPage from "./pages/RoomManagementPage";
import DoctorManagementPage from "./pages/DoctorManagementPage";
import ServicesPage from "./pages/ServicesPage";
import PatientAdmissionPage from "./pages/PatientAdmissionPage";
import SurgicalOperationPage from "./pages/SurgicalOperationPage";
import RoomTrackingPage from "./pages/RoomTrackingPage";
import UserGuard from "./components/UserGuard";
import UserLayout from "./components/Layouts/UserLayout";

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
    path: "/user/patients",
    element: (
      <Layout>
        <UserLayout title="Patient Admission">
          <PatientAdmissionPage />
        </UserLayout>
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
    path: "/user/surgicals",
    element: (
      <Layout>
        <UserLayout title="Surgical Operations">
          <SurgicalOperationPage />
        </UserLayout>
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
    path: "/user/roomstracking",
    element: (
      <Layout>
        <UserLayout title="Rooms Tracking">
          <RoomTrackingPage />
        </UserLayout>
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <UserGuard>
          <LoginPage />
        </UserGuard>
      </Layout>
    ),
  },
]);
