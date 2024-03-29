import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

function App() {
  return (
    <main className="flex min-h-screen w-full">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
