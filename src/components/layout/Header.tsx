import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../icons/Logo.tsx";
import SearchIcon from "../icons/SearchIcon.tsx";
import Button from "../shared/Button.tsx";
import DarkModeIcon from "../icons/DarkModeIcon.tsx";
import LogoutIcon from "../icons/LogoutIcon.tsx";
import DownChevronIcon from "../icons/DownChevronIcon.tsx";
import { cn } from "../../lib/utils.ts";
import MenuIcon from "../icons/MenuIcon.tsx";
import Avatar from "../shared/Avatar.tsx";
import CircleRightArrow from "../icons/CircleRightArrow.tsx";
import LightModeIcon from "../icons/LightModeIcon.tsx";

type Props = {
  profileInfo: { profileImage: string; fullName: string };
  isSidebarOpen: boolean;
  onToggleSidebar(): void;
  onLogout(): void;
};

/**
 * A header component that contains the logo, search bar, and user profile information.
 *
 * This component uses the `useNavigate` hook from `react-router-dom` to navigate to the search results page when a search is submitted. It also uses the `useEffect` hook to check the user's preferred color scheme and set the theme accordingly when the component is mounted.
 *
 * @property profileInfo - An object containing the profile image URL and full name of the user.
 * @property isSidebarOpen - A boolean indicating whether the sidebar is open.
 * @property onToggleSidebar - A function to toggle the sidebar.
 * @property onLogout - A function to log out the user.
 *
 * @example
 * import Header from "./Header";
 *
 * // In a React component
 * <Header
 *   profileInfo={{ profileImage: "https://example.com/image.jpg", fullName: "John Doe" }}
 *   isSidebarOpen={isSidebarOpen}
 *   onToggleSidebar={toggleSidebar}
 *   onLogout={logout}
 * />
 */
const Header: React.FC<Props> = ({
  profileInfo,
  isSidebarOpen,
  onToggleSidebar,
  onLogout,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  /**
   * A function that handles the search operation in the application.
   *
   * This function prevents the default form submission event, retrieves the search query from the form data, and navigates to the search results page with the search query as a URL parameter.
   *
   * @param e - The form submission event.
   *
   * @example
   * search(e); // Handles the search operation
   */
  function search(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const search = new FormData(e.currentTarget).get("search") as string;
    navigate(`/search?q=${search}`);
  }

  /**
   * A function that toggles the theme of the application.
   *
   * This function checks if the current theme is dark mode. If it is, it removes the "dark" class from the document's root element and sets the "darkMode" item in the local storage to "0". If the current theme is not dark mode, it adds the "dark" class to the document's root element and sets the "darkMode" item in the local storage to "1". It then toggles the `isDarkMode` state.
   *
   * @example
   * toggleTheme(); // Toggles the theme of the application
   */
  function toggleTheme() {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "0");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "1");
    }
    setIsDarkMode((val) => !val);
  }

  /**
   * A React effect hook that sets the theme of the application based on the user's preferred color scheme or the stored theme in local storage.
   *
   * This effect runs once when the component is mounted. It first checks if there is a "darkMode" item in the local storage. If there is none, it checks the user's preferred color scheme using the `window.matchMedia` function. If the preferred color scheme is dark, it adds the "dark" class to the document's root element, sets the `isDarkMode` state to `true`, and stores "1" in the "darkMode" item in the local storage. If the preferred color scheme is not dark, it removes the "dark" class from the document's root element, sets the `isDarkMode` state to `false`, and stores "0" in the "darkMode" item in the local storage.
   *
   * If there is a "darkMode" item in the local storage, it checks if the value is "1". If it is, it adds the "dark" class to the document's root element and sets the `isDarkMode` state to `true`. If it is not, it removes the "dark" class from the document's root element and sets the `isDarkMode` state to `false`.
   */
  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === null) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
        setIsDarkMode(true);
        localStorage.setItem("darkMode", "1");
      } else {
        document.documentElement.classList.remove("dark");
        setIsDarkMode(false);
        localStorage.setItem("darkMode", "0");
      }
      return;
    }

    if (darkMode === "1") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  return (
    <header className="relative">
      <div className="relative z-[999] flex grid-cols-[auto_1fr_auto] items-center justify-between gap-6 bg-white p-6 transition-colors dark:bg-dark md:grid">
        <div className="flex items-center gap-4">
          <button
            className={cn(
              "text-black transition-all dark:text-white lg:hidden",
              { "rotate-90": isSidebarOpen },
            )}
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
        <form
          className="mx-auto hidden w-full max-w-xl items-center gap-4 rounded-full bg-darkerWhite px-4 py-2 transition-colors dark:bg-lightDark md:flex"
          onSubmit={search}
        >
          <label className="flex flex-1 items-center gap-4">
            <span className="text-lightGray">
              <SearchIcon />
            </span>
            <input
              name="search"
              type="text"
              className="min-w-0 flex-1 bg-transparent focus:outline-none"
              placeholder="Search drive ..."
              onFocus={() => setShowSearchBtn(true)}
              onBlur={() => setShowSearchBtn(false)}
            />
          </label>
          <button
            className={cn("scale-0 transition-all dark:text-white", {
              "scale-100": showSearchBtn,
            })}
          >
            <CircleRightArrow />
          </button>
        </form>
        <div className="flex items-center gap-4">
          <div className="hidden xs:block">
            <Button
              title={isDarkMode ? "Light mode" : "Dark mode"}
              Icon={isDarkMode ? LightModeIcon : DarkModeIcon}
              className="bg-dark/10 text-dark transition-colors dark:bg-white/10 dark:text-white"
              titleClassName="lg:block hidden"
              onClick={toggleTheme}
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
          "absolute left-0 top-full z-[998] flex w-full -translate-y-full flex-col gap-4 bg-white p-6 transition-all dark:bg-dark md:hidden",
          {
            "translate-y-0 shadow-[0_30px_20px_0_#0000001a] transition-colors dark:shadow-[0_30px_20px_0_#0F1215]":
              isMenuOpen,
          },
        )}
      >
        <div className="flex flex-wrap-reverse items-center justify-end gap-4">
          <Button
            title={isDarkMode ? "Light mode" : "Dark mode"}
            Icon={isDarkMode ? LightModeIcon : DarkModeIcon}
            className="bg-dark/10 text-dark xs:hidden"
            onClick={toggleTheme}
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
        <form
          className="flex items-center gap-4 rounded-full bg-darkerWhite px-4 py-2 transition-colors dark:bg-lightDark"
          onSubmit={search}
        >
          <label className="flex flex-1 items-center gap-4">
            <span className="text-lightGray">
              <SearchIcon />
            </span>
            <input
              name="search"
              type="text"
              className="min-w-0 flex-1 bg-transparent focus:outline-none"
              placeholder="Search drive ..."
              onFocus={() => setShowSearchBtn(true)}
              onBlur={() => setShowSearchBtn(false)}
            />
          </label>
          <button
            className={cn("scale-0 text-dark transition-transform", {
              "scale-100": showSearchBtn,
            })}
          >
            <CircleRightArrow />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
