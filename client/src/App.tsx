import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthSkeleton from "./components/skeleton/AuthSkeleton";
import DashboardSkeleton from "./components/skeleton/DashboardSkeleton";

const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: "auth",
    element: (
      <Suspense fallback={<AuthSkeleton />}>
        <Auth />
      </Suspense>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
