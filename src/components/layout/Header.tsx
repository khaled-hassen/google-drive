import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../icons/Logo.tsx";
import SearchIcon from "../icons/SearchIcon.tsx";
import Button from "../shared/Button.tsx";
import DarkModeIcon from "../icons/DarkModeIcon.tsx";
import LogoutIcon from "../icons/LogoutIcon.tsx";
import DownChevronIcon from "../icons/DownChevronIcon.tsx";
import { cn } from "../../lib/utils.ts";
import MenuIcon from "../icons/MenuIcon.tsx";
import Avatar from "../shared/Avatar.tsx";

type Props = {
  profileInfo: { profileImage: string; fullName: string };
  isSidebarOpen: boolean;
  onToggleSidebar(): void;
  onLogout(): void;
};

const Header: React.FC<Props> = ({
  profileInfo,
  isSidebarOpen,
  onToggleSidebar,
  onLogout,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative">
      <div className="relative z-[999] flex grid-cols-[auto_1fr_auto] items-center justify-between gap-6 bg-white p-6 md:grid">
        <div className="flex items-center gap-4">
          <button
            className={cn("transition-transform lg:hidden", {
              "rotate-90": isSidebarOpen,
            })}
            onClick={onToggleSidebar}
          >
            <MenuIcon />
          </button>
          <Link to="/home" className="flex items-center gap-4 text-main">
            <Logo size={30} />
            <p className="text-2xl font-extrabold tracking-widest max-[444px]:hidden">
              Google Drive
            </p>
          </Link>
        </div>
        <label className="mx-auto hidden w-full max-w-xl items-center gap-4 rounded-full bg-darkerWhite px-4 py-2 md:flex">
          <SearchIcon />
          <input
            type="text"
            className="min-w-0 flex-1 bg-transparent focus:outline-none"
            placeholder="Search drive ..."
          />
        </label>
        <div className="flex items-center gap-4">
          <div className="hidden xs:block">
            <Button
              title="Dark mode"
              Icon={DarkModeIcon}
              className="bg-dark/10 text-dark"
              titleClassName="lg:block hidden"
            />
          </div>
          <div className="hidden xs:block">
            <Button
              title="Logout"
              Icon={LogoutIcon}
              variant="danger"
              titleClassName="lg:block hidden"
              onClick={onLogout}
            />
          </div>
          <Button
            title="Menu"
            Icon={DownChevronIcon}
            variant="tertiary"
            className="gap-2 md:hidden"
            iconParams={{
              className: cn("transition-transform", {
                "rotate-180": isMenuOpen,
              }),
            }}
            onClick={() => setIsMenuOpen((val) => !val)}
          />
          <Avatar
            id="header-avatar"
            imgUrl={profileInfo.profileImage}
            name={profileInfo.fullName}
            className="hidden xs:block"
          />
        </div>
      </div>

      <div
        className={cn(
          "absolute left-0 top-full z-[998] flex w-full -translate-y-full flex-col gap-4 bg-white p-6 transition-all md:hidden",
          { "translate-y-0 shadow-[0_30px_20px_0_#0000001a]": isMenuOpen },
        )}
      >
        <div className="flex flex-wrap-reverse items-center justify-end gap-4">
          <Button
            title="Dark mode"
            Icon={DarkModeIcon}
            className="bg-dark/10 text-dark xs:hidden"
          />
          <Button
            title="Logout"
            Icon={LogoutIcon}
            variant="danger"
            onClick={onLogout}
            className="xs:hidden"
          />
          <Avatar
            id="header-avatar"
            imgUrl={profileInfo.profileImage}
            name={profileInfo.fullName}
            className="size-10 xs:hidden"
          />
        </div>
        <label className="flex items-center gap-4 rounded-full bg-darkerWhite px-4 py-2">
          <SearchIcon />
          <input
            type="text"
            className="min-w-0 flex-1 bg-transparent focus:outline-none"
            placeholder="Search drive ..."
          />
        </label>
      </div>
    </header>
  );
};

export default Header;
