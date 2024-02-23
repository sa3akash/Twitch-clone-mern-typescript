import React, { useState } from "react";
import Input from "./common/Input";
import { api } from "../http";
import ErrorAlert from "./common/ErrorAlert";

const UpdatePassword = () => {
  const [updatePass, setUpdatePass] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [error, setError] = useState("");
  const [seccess, setSeccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChanege = (e: React.ChangeEvent<HTMLInputElement>) => {
    reset();
    setUpdatePass((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const reset = () => {
    setError("");
    setSeccess("");
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    api
      .updatePassword(updatePass)
      .then(({ data }) => {
        setSeccess(data?.message);
        
        setUpdatePass({
          oldPassword: "",
          newPassword: "",
        });
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
      });
  };

  return (
    <form className="max-w-sm mx-auto mt-16" onSubmit={handleSubmit}>
      <Input
        handleChange={handleInputChanege}
        name="oldPassword"
        placeholder="Inter your old password"
        title="Old Password"
        type="password"
        value={updatePass.oldPassword}
      />{" "}
      <Input
        handleChange={handleInputChanege}
        name="newPassword"
        placeholder="Inter your new password"
        title="New Password"
        type="password"
        value={updatePass.newPassword}
      />
      <button
        type="submit"
        disabled={loading}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 mb-5 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400"
      >
        Reset Your Password
      </button>
      {error && <ErrorAlert message={error} type="error" />}
      {seccess && <ErrorAlert message={seccess} type="success" />}
    </form>
  );
};

export default UpdatePassword;
