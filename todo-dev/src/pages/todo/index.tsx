import CreateTodo from "@/components/modals/CreateTodo";
import DisplayTodoCard from "@/components/todo/DisplayTodoCard";

const index = () => {
  return (
    <>
      <div className="">
        <CreateTodo />
        <DisplayTodoCard />
      </div>
    </>
  );
};

export default index;
