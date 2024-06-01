import React, { useState } from "react";

interface IMessage {
  author: string;
  message: string;
}

const dummy: IMessage[] = [
  {
    author: "shakil ahmed",
    message: "hello World",
  },
  {
    author: "shakil ahmed",
    message: "hello World 2",
  },
  {
    author: "shakil ahmed",
    message: "hello World 3",
  },
  {
    author: "shakil ahmed",
    message: "hello World 4",
  },
  {
    author: "shakil ahmed",
    message: "hello World 5",
  },
  {
    author: "shakil ahmed",
    message: "hello World 6",
  },
];

const AllMessage = () => {

    const [messageData,setMessageData] = useState<IMessage[]>(dummy)

  return (
    <div className="flex-1 p-4 flex flex-col">
      <div className="flex-1"></div>
      <div className="flex flex-col gap-3">
        {messageData && messageData.map((m, i) => (
          <div key={i}>
            <div className="capitalize">{m.author}</div>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {m.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMessage;
