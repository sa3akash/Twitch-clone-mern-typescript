import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { api } from "../http";

const UpdateStreamKey = () => {
  const user = useAuth((state) => state.user);
  const setUser = useAuth((state) => state.setUser);

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [streamValue, setStreamValue] = useState("");

  const handleCopyClick = async () => {
    setCopied(true);
    await navigator.clipboard.writeText(user?.streamKey as string);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleChangeKey = () => {
    setLoading(true);
    api
      .changeStreamKey()
      .then(({ data }) => {
        user &&
          setUser({
            ...user,
            streamKey: data.streamKey,
          });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setStreamValue(user?.streamKey as string);
  }, [user?.streamKey]);

  return (
    <div className="mt-16">
      <div className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light flex items-center justify-between gap-4 px-4 w-max ">
        <input
          name="avaterUrl"
          placeholder="Inter your avater url"
          title="Avater Url"
          type="text"
          defaultValue={streamValue}
          className="bg-transparent outline-none focus:outline-none border-none w-[280px]"
        />

        <button type="button" title="Copy" onClick={handleCopyClick}>
          {copied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          )}
        </button>
      </div>
      <button
        onClick={handleChangeKey}
        type="button"
        disabled={loading}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400"
      >
        Reset Stream Key
      </button>
    </div>
  );
};

export default UpdateStreamKey;
