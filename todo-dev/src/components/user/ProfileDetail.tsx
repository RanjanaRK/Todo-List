import { sdk } from "@/utils/sdk";
import { readMe } from "@directus/sdk";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useQuery } from "@tanstack/react-query";
import UpdateProfile from "../modals/UpdateProfile";
import { Skeleton } from "@nextui-org/skeleton";

const ProfileDetail = () => {
  const { data, isLoading, isFetched, isFetching, isSuccess } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const result = await sdk.request(readMe());
      return result;
    },
  });

  // console.log(data);

  if (isLoading || isFetching) {
    return (
      <>
        <div className="grid grid-cols-1 place-items-center">
          <Card className="w-[300px] sm:w-[350px]">
            <CardBody>
              <div className="">
                <div className="">
                  <Image src="" />
                  <div className="space-y-2 px-7">
                    <div className="">
                      <Skeleton className="rounded-xl">
                        <span className="text-xl font-bold">Usename: </span>
                      </Skeleton>
                    </div>
                    <div className="">
                      <Skeleton className="rounded-xl">
                        <span className="text-xl font-bold">Email: </span>
                      </Skeleton>
                    </div>
                    <div className="">
                      <Skeleton className="rounded-xl">
                        <span className="text-xl font-bold">Nickname: </span>
                      </Skeleton>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Skeleton className="rounded-xl">
                      <UpdateProfile userInfo={data as any} />
                    </Skeleton>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 place-items-center">
        <Card className="w-[300px] sm:w-[350px]">
          <CardBody>
            <div className="">
              <div className="">
                <Image src="" />
                <div className="px-7">
                  <div className="">
                    <span className="text-xl font-bold">Usename: </span>
                    {data?.first_name} {data?.last_name}
                  </div>
                  <div className="">
                    <span className="text-xl font-bold">Email: </span>
                    {data?.email}
                  </div>
                  <div className="">
                    <span className="text-xl font-bold">Nickname: </span>
                    {data?.title}
                  </div>
                  {/* <div className=""></div> */}
                </div>
                <div className="flex justify-center">
                  <UpdateProfile userInfo={data as any} />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ProfileDetail;
