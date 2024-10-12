import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./components/AdminLayout";

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
    path: "/login",
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
]);
