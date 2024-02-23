import { useEffect, useState } from "react";
import Input from "./common/Input";
import { api } from "../http";
import ErrorAlert from "./common/ErrorAlert";
import { useAuth } from "../store/auth";

const UpdateInfo = () => {
  const [updateInfo, setUpdateInfo] = useState({
    name: "",
    title: "",
    desc: "",
    avaterUrl: "",
  });

  const user = useAuth((state) => state.user);
  const setUser = useAuth((state) => state.setUser);

  const [error, setError] = useState("");
  const [seccess, setSeccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChanege = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    reset();
    setUpdateInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      .updateInfo(updateInfo)
      .then(({ data }) => {
        setSeccess("Channel info updated successfull.");
        user &&
          setUser({
            ...user,
            ...data,
          });
          setLoading(false)
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
        setLoading(false)
      });
  };

  useEffect(() => {
    setUpdateInfo({
      avaterUrl: user?.avaterUrl as string,
      desc: user?.desc as string,
      name: user?.name as string,
      title: user?.title as string,
    });
  }, [user]);

  return (
    <form className="max-w-sm mx-auto mt-16" onSubmit={handleSubmit}>
      <Input
        handleChange={handleInputChanege}
        name="name"
        placeholder="Inter your name"
        title="Name"
        type="text"
        value={updateInfo.name}
      />
      <Input
        handleChange={handleInputChanege}
        name="title"
        placeholder="Inter your channel title"
        title="Title"
        type="text"
        value={updateInfo.title}
      />
      <Input
        handleChange={handleInputChanege}
        name="avaterUrl"
        placeholder="Inter your avater url"
        title="Avater Url"
        type="text"
        value={updateInfo.avaterUrl}
      />

      <div className="mt-5">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Description
        </label>
        <textarea
          id="message"
          name="desc"
          onChange={handleInputChanege}
          value={updateInfo.desc}
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Leave a comment..."
        ></textarea>
      </div>

      <div className="flex items-start mb-5 mt-5">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div>
        <label
          htmlFor="terms"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          I agree with the{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            terms and conditions
          </a>
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 mb-5 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400"
      >
        Update Info
      </button>
      {error && <ErrorAlert message={error} type="error" />}
      {seccess && <ErrorAlert message={seccess} type="success" />}
    </form>
  );
};

export default UpdateInfo;
