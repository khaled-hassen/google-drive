import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGoogleLogout } from "../../hooks/useGoogleLogout.ts";
import { useGooglePeopleApi } from "../../hooks/useGooglePeopleApi.ts";
import Header from "./Header.tsx";
import Sidebar from "./Sidebar.tsx";
import { useGoogleDriveApi } from "../../hooks/useGoogleDriveApi.ts";

type Props = {
  children: React.ReactNode;
};

/**
 * A PageLayout component that serves as the main layout for the pages of the application.
 *
 * This component uses the `useNavigate` and `useLocation` hooks from `react-router-dom` to navigate to different pages and check the current location. It also uses the `useState` and `useEffect` hooks to manage the states of the profile info, storage info, and the sidebar, and to close the sidebar when the location changes. It also uses the `useGoogleLogout`, `useGooglePeopleApi`, and `useGoogleDriveApi` hooks to log out from Google, get the profile info, and get the storage info, respectively.
 *
 * @property children - The children components to be rendered inside the layout.
 *
 * @example
 * import PageLayout from "./PageLayout";
 *
 * // In a React component
 * <PageLayout>
 *   // Children components
 * </PageLayout>
 */
const PageLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useGoogleLogout(() => navigate("/"));
  const [profileInfo, setProfileInfo] = useState({
    profileImage: "",
    fullName: "",
  });
  const [storageInfo, setStorageInfo] = useState({ total: 0, used: 0 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useGooglePeopleApi(async ({ getProfileInfo }) => {
    const url = await getProfileInfo();
    setProfileInfo(url);
  });

  useGoogleDriveApi(async ({ getStorageInfo }) => {
    const info = await getStorageInfo();
    setStorageInfo(info);
  });

  useEffect(() => {
    if (isSidebarOpen) setIsSidebarOpen(false);
  }, [location]);

  return (
    <div className="flex max-h-screen w-full flex-col bg-white transition-colors dark:bg-dark">
      <Header
        profileInfo={profileInfo}
        onLogout={logout}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((val) => !val)}
      />
      <div className="relative flex h-[calc(100vh-5.5rem)]">
        <Sidebar storageInfo={storageInfo} isOpen={isSidebarOpen} />
        <div className="flex-1 overflow-auto px-6 pb-20">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
