import React from "react";

type AddColumnBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const AddColumnBtn: React.FC<AddColumnBtnProps> = () => {
  return (
    <button className="h-14 w-60 min-w-60 cursor-pointer bg-primary rounded-lg border-2 border-secondary ring-rose-500 hover:ring-2 duration-500">
      Add Column
    </button>
  );
};

export default AddColumnBtn;
