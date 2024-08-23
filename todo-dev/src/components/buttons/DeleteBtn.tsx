import { sdk } from "@/utils/sdk";
import { TodoSchema } from "@/utils/types";
import { deleteItem } from "@directus/sdk";
import { Button } from "@nextui-org/button";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const DeleteBtn = ({ data }: { data: TodoSchema }) => {
  const queryClient = useQueryClient();

  const [load, setLoad] = useState(false);

  const todoDeletefn = async () => {
    await sdk.request(deleteItem("todos", data.id));

    toast.success("deleted successfully");

    queryClient.refetchQueries({ queryKey: ["todos"] });
  };

  return (
    <>
      <Button
        onPress={todoDeletefn}
        isLoading={load}
        variant="light"
        size="sm"
        isIconOnly>
        <Trash2 color="red" />
      </Button>
    </>
  );
};

export default DeleteBtn;
