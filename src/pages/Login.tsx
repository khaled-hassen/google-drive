import React from "react";
import Logo from "../components/icons/Logo.tsx";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/shared/Button.tsx";
import GoogleIcon from "../components/icons/GoogleIcon.tsx";
import HeroImage from "../assets/hero.png";
import BgPattern from "../assets/bg-pattern.svg";
import { useGoogleLogin } from "../hooks/useGoogleLogin.ts";

/**
 * A Login component that allows users to log in with their Google account.
 *
 * This component uses the `useGoogleLogin` hook to handle the Google login process. When the user clicks the "Login with Google" button, the `login` function from the `useGoogleLogin` hook is called, which initiates the Google login process. If the login is successful, the user is redirected to the home page.
 *
 * @example
 * import Login from "./Login";
 *
 * // In a React component
 * <Login />
 */
const Login: React.FC = ({}) => {
  const navigate = useNavigate();
  const login = useGoogleLogin(() => navigate("/home"));

  return (
    <div
      className="flex w-full flex-col bg-main bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${BgPattern})` }}
    >
      <header className="flex w-full items-center justify-between gap-10 p-12">
        <Link to="/" className="flex items-center gap-4 text-white">
          <Logo />
          <p className="text-3xl font-extrabold tracking-widest">
            Google Drive
          </p>
        </Link>
        <div className="hidden md:block">
          <Button
            title="Login with google"
            Icon={GoogleIcon}
            iconParams={{ size: 20 }}
            onClick={() => login()}
            className="px-8 py-3"
          />
        </div>
      </header>

      <section className="flex w-full flex-col items-center justify-between gap-8 overflow-x-clip px-12 py-20 transition-[padding] lg:flex-row lg:pr-0 lg:pt-0">
        <div className="flex flex-col items-start gap-8 text-white lg:max-w-2xl">
          <h1 className="text-6xl font-bold tracking-wider">
            Easy and secure access to your content
          </h1>
          <p className="text-2xl">
            Store, share, and collaborate on files and folders from your mobile
            device, tablet, or computer
          </p>
          <Button
            title="Login with google"
            Icon={GoogleIcon}
            className="px-8 py-4 text-2xl transition-[padding] sm:px-16"
            onClick={() => login()}
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
