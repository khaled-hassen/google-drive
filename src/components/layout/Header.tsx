import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../icons/Logo.tsx";
import SearchIcon from "../icons/SearchIcon.tsx";
import Button from "../shared/Button.tsx";
import DarkModeIcon from "../icons/DarkModeIcon.tsx";
import LogoutIcon from "../icons/LogoutIcon.tsx";
import DownChevronIcon from "../icons/DownChevronIcon.tsx";
import { cn } from "../../lib/utils.ts";

type Props = {
  profilePicture: string | undefined;
  onLogout(): void;
};

const Header: React.FC<Props> = ({ profilePicture, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative">
      <header className="relative z-[2] flex grid-cols-[auto_1fr_auto] items-center justify-between gap-6 bg-white px-6 py-10 md:grid">
        <Link to="/home" className="flex items-center gap-4 text-main">
          <Logo size={30} />
          <p className="text-2xl font-extrabold tracking-widest max-[410px]:hidden">
            Google Drive
          </p>
        </Link>
        <label className="bg-darkerWhite mx-auto hidden w-full max-w-xl items-center gap-4 rounded-full px-4 py-2 md:flex">
          <SearchIcon />
          <input
            type="text"
            className="min-w-0 flex-1 bg-transparent focus:outline-none"
            placeholder="Search drive ..."
          />
        </label>
        <div className="flex items-center gap-4">
          <div className="xs:block hidden">
            <Button
              title="Dark mode"
              Icon={DarkModeIcon}
              className="bg-dark/10 text-dark"
              titleClassName="lg:block hidden"
            />
          </div>
          <div className="xs:block hidden">
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
          <img
            src={profilePicture}
            alt=""
            className="xs:block hidden size-10 rounded-full object-cover"
          />
        </div>
      </header>

      <div
        className={cn(
          "absolute left-0 top-full z-[1] flex w-full -translate-y-full flex-col gap-4 bg-white p-6 transition-all md:hidden",
          { "translate-y-0 shadow-[0_30px_20px_0_#0000001a]": isMenuOpen },
        )}
      >
        <div className="flex flex-wrap-reverse items-center justify-end gap-4">
          <Button
            title="Dark mode"
            Icon={DarkModeIcon}
            className="xs:hidden bg-dark/10 text-dark"
          />
          <Button
            title="Logout"
            Icon={LogoutIcon}
            variant="danger"
            onClick={onLogout}
            className="xs:hidden"
          />
          <img
            src={profilePicture}
            alt=""
            className="xs:hidden size-10 rounded-full object-cover"
          />
        </div>
        <label className="bg-darkerWhite flex items-center gap-4 rounded-full px-4 py-2">
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
