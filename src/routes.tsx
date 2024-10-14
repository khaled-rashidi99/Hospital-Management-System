import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./components/AdminLayout";
import DepartmentPage from "./pages/DepartmentManagementPage";
import RoomManagementPage from "./pages/RoomManagementPage";
import DoctorManagementPage from "./pages/DoctorManagementPage";

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
    path: "/login",
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
]);
