import TodoCard from "./TodoCard";
import { useQuery } from "@tanstack/react-query";
import { sdk } from "@/utils/sdk";
import { readItems, readMe } from "@directus/sdk";
import { Skeleton } from "@nextui-org/skeleton";

const DisplayTodoCard = () => {
  const { data, isLoading, isFetching, isFetched, isSuccess } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { id } = await sdk.request(readMe());
      const data = await sdk.request(
        readItems("todos", {
          fields: ["*"],
          filter: {
            user_created: {
              _eq: id as any,
            },
          },
        }),
      );

      return data;
    },
  });

  if (isLoading || isFetching) {
    return (
      <>
        <div className="m-4 flex flex-col items-center justify-center gap-8 py-4">
          <div className="grid min-w-[280px] max-w-[280px] grid-cols-3 gap-6">
            <div className="col-span-2 break-words">
              <Skeleton className="rounded-xl">abc</Skeleton>
            </div>
            <div className="flex gap-2">
              <Skeleton className="rounded-xl">
                <div className="">sxsnnsn</div>
              </Skeleton>
              <Skeleton className="rounded-xl">
                <div className="">sxsnnsn</div>
              </Skeleton>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isFetched || isSuccess) {
    if (data?.length === 0) {
      return (
        <>
          <div className="m-4 flex flex-col items-center justify-center gap-8 py-4">
            <div className="">No Data</div>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="m-4 flex flex-col items-center justify-center gap-8 py-4">
          {data?.map((items) => {
            return (
              <TodoCard
                info={items}
                key={items.id}
              />
            );
          })}
        </div>
      </>
    );
  }
};

export default DisplayTodoCard;
