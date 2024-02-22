import React from "react";

interface Props {
    type: string;
    name: string;
    title: string;
    placeholder:string;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    value:string;
}

const Input:React.FC<Props> = ({name,title,type,placeholder,handleChange,value}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {title}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default Input;
