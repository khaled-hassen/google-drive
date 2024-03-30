import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Error404 from "./pages/Error404.tsx";

const CLIENT_ID = import.meta.env.VITE_API_GOOGLE_CLIENT_ID as string;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <main className="flex min-h-screen w-full">
        <RouterProvider router={router} />
      </main>
    </GoogleOAuthProvider>
  );
}

export default App;
