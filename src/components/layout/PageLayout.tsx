import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogout } from "../../hooks/useGoogleLogout.ts";
import { useGooglePeopleApi } from "../../hooks/useGooglePeopleApi.ts";
import Header from "./Header.tsx";

type Props = {
  children: React.ReactNode;
};

const PageLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const logout = useGoogleLogout(() => navigate("/"));
  const [profilePicture, setProfilePicture] = useState<string>();

  useGooglePeopleApi(async ({ getProfilePicture }) => {
    const url = await getProfilePicture();
    setProfilePicture(url);
  });

  return (
    <div className="w-full">
      <Header profilePicture={profilePicture} onLogout={logout} />
      <div className="">{children}</div>
    </div>
  );
};

export default PageLayout;
