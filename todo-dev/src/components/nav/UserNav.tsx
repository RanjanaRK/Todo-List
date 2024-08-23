import { sdk } from "@/utils/sdk";
import { readMe } from "@directus/sdk";
import { Button } from "@nextui-org/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const UserNav = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const result = await sdk.request(readMe());
      return result;
    },
  });

  queryClient.refetchQueries({ queryKey: ["user"] });

  const logOutFn = async () => {
    await sdk.logout();
    router.push("/");
    toast.success("successfully logout");
  };
  return (
    <>
      <div className="flex-row items-center justify-center gap-4 sm:flex">
        <div className="text-xl font-bold underline">{data?.first_name}</div>

        <div className="flex items-center justify-center">
          <Button
            variant="light"
            color="default"
            isIconOnly
            onPress={logOutFn}
            size="sm">
            <LogOutIcon
              size={26}
              color="red"
            />
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserNav;
