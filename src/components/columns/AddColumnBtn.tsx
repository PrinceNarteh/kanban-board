import React from "react";
import { PlusIcon } from "../../icons";

type AddColumnBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const AddColumnBtn: React.FC<AddColumnBtnProps> = (props) => {
  return (
    <button
      {...props}
      className="flex gap-3 justify-center items-center h-14 w-60 min-w-60 cursor-pointer bg-primary rounded-lg border-2 border-secondary ring-rose-500 hover:ring-2 duration-500"
    >
      <PlusIcon />
      <span>Add Column</span>
    </button>
  );
};
