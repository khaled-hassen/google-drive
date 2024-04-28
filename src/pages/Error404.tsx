import React from "react";
import Logo from "../components/icons/Logo.tsx";
import { Link } from "react-router-dom";
import Button from "../components/shared/Button.tsx";
import BgPattern from "../assets/bg-pattern.svg";
import HomeIcon from "../components/icons/HomeIcon.tsx";

/**
 * A Error404 component that displays a 404 error page.
 *
 * This component uses the `Logo` component to display the logo and the `Button` component to display a button that redirects to the home page. It also uses the `Link` component from `react-router-dom` to create a link to the home page.
 *
 * @example
 * import Error404 from "./Error404";
 *
 * // In a React component
 * <Error404 />
 */
const Error404: React.FC = ({}) => {
  return (
    <div
      className=" flex w-full flex-col bg-main bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${BgPattern})` }}
    >
      <header className="flex items-center justify-between gap-10 p-12">
        <Link to="/" className="flex items-center gap-4 text-white">
          <Logo />
          <p className="text-3xl font-extrabold tracking-widest">
            Google Drive
          </p>
        </Link>
      </header>

      <section className="content-container flex flex-col items-center gap-8 pt-20 text-center text-white">
        <h1 className="text-9xl font-bold tracking-wider">404</h1>
        <p className="text-2xl">The page you are looking for does not exist</p>
        <Link to="/">
          <Button
            title="Go back to home"
            Icon={HomeIcon}
            iconParams={{ size: 30 }}
            className="px-8 py-3 text-2xl"
          />
        </Link>
      </section>
    </div>
  );
};

export default Error404;
