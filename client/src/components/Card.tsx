import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  title: string;
  name: string;
  isOnline: boolean;
  avaterUrl: string;
  desc: string;
}

const Card: FC<Props> = ({ avaterUrl, id, isOnline, name, title, desc }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
      onClick={() => navigate(`/channel/${id}`)}
    >
      <a href="#">
        <img
          className="p-0 rounded-t-lg h-[250px] w-full object-cover"
          src={avaterUrl}
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>

        <div className="mt-2.5 mb-5 flex flex-col">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {name}
          </div>
          <div>{desc}</div>
        </div>
        <div className="flex items-center justify-between">
          <div></div>
          <span
            className={
              isOnline
                ? `text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`
                : `text-white bg-rose-700 hover:bg-rose-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`
            }
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
