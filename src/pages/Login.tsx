import React from "react";
import Logo from "../components/icons/Logo.tsx";
import { Link } from "react-router-dom";
import Button from "../components/shared/Button.tsx";
import GoogleIcon from "../components/icons/GoogleIcon.tsx";
import HeroImage from "../assets/hero.png";
import BgPattern from "../assets/bg-pattern.svg";

const Login: React.FC = ({}) => {
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

      <section className="content-container flex flex-col items-center justify-between gap-8 overflow-x-clip py-20 transition-[padding] lg:flex-row lg:pr-0 lg:pt-0">
        <div className="flex flex-col items-start gap-8 text-white lg:max-w-2xl">
          <h1 className="text-6xl font-bold tracking-wider">
            Easy and secure access to your content
          </h1>
          <p className="text-2xl">
            Store, share, and collaborate on files and folders from your mobile
            device, tablet, or computer
          </p>
          <Button
            text="Login with google"
            Icon={GoogleIcon}
            className="text-2xl transition-[padding] sm:px-16"
          />
        </div>
        <img
          src={HeroImage}
          alt=""
          className="w-full rounded-[2rem] object-contain shadow-2xl transition-[margin] lg:-mr-[30rem] lg:h-[34rem] lg:w-auto xl:-mr-80"
        />
      </section>
    </div>
  );
};

export default Login;
