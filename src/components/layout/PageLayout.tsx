import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../icons/Logo.tsx";
import Button from "../shared/Button.tsx";
import LogoutIcon from "../icons/LogoutIcon.tsx";
import { removeAccessToken } from "../../lib/auth.ts";
import DarkModeIcon from "../icons/DarkModeIcon.tsx";
import { useGoogleLogout } from "../../hooks/useGoogleLogout.ts";
import { useGooglePeopleApi } from "../../hooks/useGooglePeopleApi.ts";

type Props = {
  children: React.ReactNode;
};

const PageLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const { ready, getProfilePicture } = useGooglePeopleApi();

  const [profilePicture, setProfilePicture] = useState<string>();

  const logout = useGoogleLogout(() => {
    removeAccessToken();
    navigate("/");
  });

  useEffect(() => {
    if (!ready) return;
    getProfilePicture().then((url) => {
      setProfilePicture(url);
    });
  }, [ready]);

  return (
    <div className="w-full">
      <header className="content-container flex items-center justify-between gap-10 py-12">
        <Link to="/home" className="flex items-center gap-4">
          <Logo />
          <p className="text-3xl font-extrabold tracking-widest text-main">
            Google Drive
          </p>
        </Link>
        <div className="flex items-center gap-4">
          <Button
            text="Dark mode"
            Icon={DarkModeIcon}
            className="bg-dark/10 text-dark"
          />
          <Button
            text="Logout"
            Icon={LogoutIcon}
            variant="danger"
            onClick={logout}
          />
          <img src={profilePicture} alt="" />
        </div>
      </header>

      <div className="">{children}</div>
    </div>
  );
};

export default PageLayout;
