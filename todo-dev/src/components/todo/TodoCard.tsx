import { TodoSchema } from "@/utils/types";
import DeleteBtn from "../buttons/DeleteBtn";
import UpdateBtn from "../buttons/UpdateBtn";

const TodoCard = ({ info }: { info: TodoSchema }) => {
  return (
    <>
      <div className="grid min-w-[280px] max-w-[280px] grid-cols-3 gap-6 border-b-2 border-blue-300">
        <div className="col-span-2 break-words">{info.title}</div>
        <div className="">
          <UpdateBtn data={info} />
          <DeleteBtn data={info} />
        </div>
      </div>
    </>
  );
};

export default TodoCard;
