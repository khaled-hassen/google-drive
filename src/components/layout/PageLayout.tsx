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
  const [profilePicture, setProfilePicture] = useState<string>();
  const [storageInfo, setStorageInfo] = useState({ total: 0, used: 0 });

  useGooglePeopleApi(async ({ getProfilePicture }) => {
    const url = await getProfilePicture();
    setProfilePicture(url);
  });

  useGoogleDriveApi(async ({ getStorageInfo }) => {
    const info = await getStorageInfo();
    setStorageInfo(info);
  });

  return (
    <div className="flex w-full flex-col">
      <Header profilePicture={profilePicture} onLogout={logout} />
      <div className="flex flex-1">
        <Sidebar storageInfo={storageInfo} />
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
