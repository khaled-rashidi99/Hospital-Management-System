import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Layout title="Dashboard">
          <DashboardPage />
        </Layout>
      </>
    ),
  },
]);
