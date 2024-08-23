import { sdk } from "@/utils/sdk";
import { CreateTodoSchemaType } from "@/utils/types";
import { createTodoSchema } from "@/utils/zodSchema";
import { createItem } from "@directus/sdk";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/modal";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CreateTodo = () => {
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTodoSchemaType>({
    resolver: zodResolver(createTodoSchema),
  });

  const addFn = async (fdata: CreateTodoSchemaType) => {
    await sdk.request(createItem("todos", { title: fdata.title }));

    // console.log(fdata);
    reset();

    queryClient.refetchQueries({ queryKey: ["todos"] });

    toast.success("created");
  };

  return (
    <>
      <div className="fixed bottom-12 right-8 z-40">
        <Button
          onPress={onOpen}
          radius="full"
          color="primary"
          isIconOnly
          className="h-14 w-14">
          <Plus size={36} />
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          size="sm"
          hideCloseButton={true}>
          <ModalContent>
            {(onClose) => (
              <ModalBody>
                <div className="text-center font-bold">NEW NOTE</div>
                <form onSubmit={handleSubmit(addFn)}>
                  <div className="space-y-9">
                    <Input
                      {...register("title")}
                      variant="bordered"
                      radius="sm"
                      color="primary"
                      placeholder="Input your note..."
                      className=""
                    />
                    <div className="flex justify-between">
                      <Button
                        onPress={onClose}
                        variant="ghost"
                        color="primary"
                        radius="sm"
                        size="sm">
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="ghost"
                        color="primary"
                        radius="sm"
                        size="sm"
                        onPressEnd={onClose}>
                        Add
                      </Button>
                    </div>
                  </div>
                </form>
              </ModalBody>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default CreateTodo;
