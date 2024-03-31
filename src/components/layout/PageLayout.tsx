import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogout } from "../../hooks/useGoogleLogout.ts";
import { useGooglePeopleApi } from "../../hooks/useGooglePeopleApi.ts";
import Header from "./Header.tsx";
import Sidebar from "./Sidebar.tsx";
import { useGoogleDriveApi } from "../../hooks/useGoogleDriveApi.ts";

type Props = {
  children: React.ReactNode;
};

const PageLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
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

  return (
    <div className="flex max-h-screen w-full flex-col">
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
