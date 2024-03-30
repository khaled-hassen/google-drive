import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import PrivateRoutes from "./components/routes/PrivateRoutes.tsx";
import PublicRoutes from "./components/routes/PublicRoutes.tsx";
import Error404 from "./pages/Error404.tsx";
import { useAuth } from "./hooks/useAuth.ts";
import GoogleApiProvider from "./components/providers/GoogleApiProvider.tsx";
import { discoveryDocs, scopes } from "./lib/config.ts";

const CLIENT_ID = import.meta.env.VITE_API_GOOGLE_CLIENT_ID as string;
const API_KEY = import.meta.env.VITE_API_GOOGLE_API_KEY as string;

function App() {
  const { handleLogin } = useAuth();

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
            </Route>
            <Route element={<PublicRoutes />}>
              <Route path="/" element={<Login onLogin={handleLogin} />} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>
      </main>
    </GoogleApiProvider>
  );
}

export default App;
