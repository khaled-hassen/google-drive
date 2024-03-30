import React from "react";
import Logo from "../components/icons/Logo.tsx";
import { Link } from "react-router-dom";
import Button from "../components/shared/Button.tsx";
import GoogleIcon from "../components/icons/GoogleIcon.tsx";
import BgPattern from "../assets/bg-pattern.svg";

const Home: React.FC = ({}) => {
  return (
    <div
      className=" flex w-full flex-col bg-main bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${BgPattern})` }}
    >
      <header className="content-container flex items-center justify-between gap-10 py-12">
        <Link to="/" className="flex items-center gap-4">
          <Logo color="white" />
          <p className="text-3xl font-extrabold tracking-widest text-white">
            Google Drive
          </p>
        </Link>
        <div className="hidden md:block">
          <Button
            text="Login with google"
            Icon={GoogleIcon}
            iconParams={{ size: 20 }}
          />
        </div>
      </header>
    </div>
  );
};

export default Home;
