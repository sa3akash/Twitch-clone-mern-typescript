import React, { useState } from "react";
import LogoWrapper from "./common/LogoWrapper";
import Input from "./common/Input";
import { ILogin } from "../interfaces";
import { api } from "../http";
import ErrorAlert from "./common/ErrorAlert";
import { useAuth } from "../store/auth";

interface Props {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<Props> = ({ setIsLogin }) => {
  const [data, setData] = useState<ILogin>({
    password: "",
    email: "",
  });

  const setUser = useAuth((state)=>state.setUser);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [seccess, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setLoading(false);
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    api
      .login(data)
      .then(({ data }) => {
        setUser(data?.data)
        setSuccess(data.message);
        setTimeout(() => {
          setSuccess("");
        }, 2000);
        setData({
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900 w-screen h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <LogoWrapper />

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <Input
                name="email"
                title="Your email"
                type="email"
                placeholder="shakilmh626@gmail.com"
                handleChange={handleChange}
                value={data.email}
              />
              <Input
                name="password"
                title="Password"
                type="password"
                placeholder="••••••••"
                handleChange={handleChange}
                value={data.password}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#5468ff] hover:bg-[#5468ffbf] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-gray-500"
                disabled={loading}
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <span
                  onClick={() => setIsLogin(false)}
                  className="font-medium text-[#5468ff] hover:underline dark:text-primary-500 cursor-pointer select-none"
                >
                  Sign up
                </span>
              </p>
              {error && <ErrorAlert message={error} type="error" />}
              {seccess && <ErrorAlert message={seccess} type="success" />}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
