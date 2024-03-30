import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./pages/Home.tsx";
import PrivateRoutes from "./components/routes/PrivateRoutes.tsx";
import PublicRoutes from "./components/routes/PublicRoutes.tsx";
import Error404 from "./pages/Error404.tsx";
import {
  AccessToken,
  getAccessToken,
  isLoggedIn,
  removeAccessToken,
  saveAccessToken,
} from "./lib/auth.ts";
import { useCallback, useEffect, useRef } from "react";

const CLIENT_ID = import.meta.env.VITE_API_GOOGLE_CLIENT_ID as string;

function App() {
  const timer = useRef<number>();

  const startTimer = useCallback((expiresAt: Date) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      removeAccessToken();
      location.replace("/");
    }, expiresAt.getTime() - Date.now());
  }, []);

  const handleLogin = useCallback((accessToken: AccessToken) => {
    saveAccessToken(accessToken);
    startTimer(accessToken.expiresAt);
  }, []);

  useEffect(() => {
    if (isLoggedIn()) {
      const { expiresAt } = getAccessToken()!;
      startTimer(expiresAt);
    } else removeAccessToken();

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
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
    </GoogleOAuthProvider>
  );
}

export default App;
