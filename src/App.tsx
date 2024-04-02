import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import PrivateRoutes from "./components/routes/PrivateRoutes.tsx";
import PublicRoutes from "./components/routes/PublicRoutes.tsx";
import Error404 from "./pages/Error404.tsx";
import GoogleApiProvider from "./components/providers/GoogleApiProvider.tsx";
import { discoveryDocs, scopes } from "./lib/config.ts";
import Folder from "./pages/Folder.tsx";
import Drive from "./pages/Drive.tsx";
import { Toaster } from "react-hot-toast";
import Search from "./components/shared/Search.tsx";

const CLIENT_ID = import.meta.env.VITE_API_GOOGLE_CLIENT_ID as string;
const API_KEY = import.meta.env.VITE_API_GOOGLE_API_KEY as string;

function App() {
  return (
    <GoogleApiProvider
      apiKey={API_KEY}
      clientId={CLIENT_ID}
      scopes={scopes}
      discoveryDocs={discoveryDocs}
    >
      <main className="flex min-h-screen w-full">
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route path="/drive" element={<Drive />} />
              <Route path="/folder/:id" element={<Folder />} />
              <Route path="/search" element={<Search />} />
            </Route>
            <Route element={<PublicRoutes />}>
              <Route path="/" element={<Login />} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>

        <Toaster
          position="top-center"
          toastOptions={{
            className:
              "rounded-full dark:bg-dark dark:text-white transition-colors",
          }}
        />
      </main>
    </GoogleApiProvider>
  );
}

export default App;
