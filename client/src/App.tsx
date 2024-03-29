import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthSkeleton from "./components/skeleton/AuthSkeleton";
import DashboardSkeleton from "./components/skeleton/DashboardSkeleton";
import Channels from "./components/Channels";
import { Protected, SemiProtected } from "./Protected";
import Settings from "./pages/Settings";

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
    children: [
      {
        path: "/",
        element: <Channels />,
      },
      {
        path: "settings",
        element: (
          <Protected>
            <Settings />
          </Protected>
        ),
      },
      {
        path: "channel/:id",
        element: <div>single channel</div>,
      },
    ],
  },
  {
    path: "auth",
    element: (
      <Suspense fallback={<AuthSkeleton />}>
        <SemiProtected>
          <Auth />
        </SemiProtected>
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
