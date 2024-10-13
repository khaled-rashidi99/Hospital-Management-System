import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./components/AdminLayout";
import DepartmentPage from "./pages/DepartmentManagementPage";

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
    path: "/login",
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
]);
