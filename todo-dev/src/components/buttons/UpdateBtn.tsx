import { Button } from "@nextui-org/button";
import { PenBox } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { EditTodoSchemaType, TodoSchema } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTodoSchema } from "@/utils/zodSchema";
import { Input } from "@nextui-org/input";
import { sdk } from "@/utils/sdk";
import { updateItem } from "@directus/sdk";
import { toast } from "react-toastify";

const UpdateBtn = ({ data }: { data: TodoSchema }) => {
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditTodoSchemaType>({
    resolver: zodResolver(editTodoSchema),
  });

  const editFn = async (editdata: EditTodoSchemaType) => {
    await sdk.request(
      updateItem("todos", data.id, {
        title: editdata.title,
      }),
    );
    toast.success("updated");
    queryClient.refetchQueries({ queryKey: ["todos"] });
  };

  return (
    <>
      <Button
        onPress={onOpen}
        variant="light"
        size="sm"
        isIconOnly>
        <PenBox color="orange" />
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
              <div className="text-center font-bold">Update NOTE</div>
              <form onSubmit={handleSubmit(editFn)}>
                <div className="space-y-9">
                  <Input
                    {...register("title")}
                    defaultValue={data?.title}
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
    </>
  );
};

export default UpdateBtn;
