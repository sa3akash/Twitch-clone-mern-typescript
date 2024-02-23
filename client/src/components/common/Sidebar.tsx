import { Link } from "react-router-dom";

const dummy = [
  {
    _id: 1,
    name: "shakil ahmed",
    isOnline: false,
    title: "this is title",
  },
  {
    _id: 2,
    name: "avro khan",
    isOnline: true,
    title: "this is title",
  },
  {
    _id: 3,
    name: "shuva aktar",
    isOnline: true,
    title: "this is title",
  },
];

const Sidebar = () => {
  return (
    <div className="w-64 h-full transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full mt-16 px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <h4>For you!</h4>
        <h4 className="font-semibold">Channels</h4>
        <ul className="space-y-2 font-medium mt-2">
          {dummy.map((item, index) => (
            <li className="cursor-pointer select-none " key={index}>
              <Link to={`/channel/${item._id}`}>
                <span className="p-2 text-gray-900 bg-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group flex items-center justify-between">
                  <span className="ms-3 capitalize">{item.name}</span>
                  {item.isOnline && (
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
