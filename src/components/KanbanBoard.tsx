import AddColumnBtn from "./AddColumnBtn";

const KanbanBoard = () => {
  return (
    <div className="m-auto flex w-full min-h-screen items-center overflow-x-auto px-10">
      <div className="mx-auto">
        <AddColumnBtn />
      </div>
    </div>
  );
};

export default KanbanBoard;
