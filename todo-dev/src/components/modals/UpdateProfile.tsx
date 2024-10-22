import { sdk } from "@/utils/sdk";
import { UpdateProfileType, UserType } from "@/utils/types";
import { updateProfileSchema } from "@/utils/zodSchema";
import { updateMe } from "@directus/sdk";
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
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UpdateProfile = ({ userInfo }: UserType) => {
  console.log(userInfo);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileType>({
    resolver: zodResolver(updateProfileSchema),
  });

  const editProfileFn = async (updateData: UpdateProfileType) => {
    const request = await sdk.request(
      updateMe({
        email: updateData.email,
        first_name: updateData.first_name,
        last_name: updateData.last_name,
        title: updateData.title,
      }),
    );

    toast.success("successfully update your profile");
    queryClient.refetchQueries({ queryKey: ["me"] });
  };

  return (
    <>
      <div className="">
        <Button
          onPress={onOpen}
          variant="light"
          color="primary">
          Update me
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
                <div className="text-center font-bold">Update Profile</div>
                <form onSubmit={handleSubmit(editProfileFn)}>
                  <div className="space-y-9">
                    <Input
                      {...register("first_name")}
                      defaultValue={
                        userInfo?.first_name ? userInfo?.first_name : ""
                      }
                      variant="bordered"
                      radius="sm"
                      color="primary"
                      placeholder="Input your note..."
                      className=""
                    />
                    <Input
                      {...register("last_name")}
                      defaultValue={
                        userInfo.last_name ? userInfo.last_name : ""
                      }
                      variant="bordered"
                      radius="sm"
                      color="primary"
                      placeholder="Input your note..."
                      className=""
                    />
                    <Input
                      {...register("title")}
                      defaultValue={userInfo.title ? userInfo.title : ""}
                      variant="bordered"
                      radius="sm"
                      color="primary"
                      placeholder="Input your note..."
                      className=""
                    />
                    <Input
                      {...register("email")}
                      defaultValue={userInfo.email ? userInfo.email : ""}
                      variant="bordered"
                      radius="sm"
                      type="email"
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
                        Update
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

export default UpdateProfile;
