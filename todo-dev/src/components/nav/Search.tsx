import { sdk } from "@/utils/sdk";
import { searchType } from "@/utils/types";
import { seachSchema } from "@/utils/zodSchema";
import { createItem, readItems } from "@directus/sdk";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useQuery } from "@tanstack/react-query";
import { GhostIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Search = () => {
  const [searchType, setSearchType] = useState();

  const { register, handleSubmit } = useForm<searchType>({
    resolver: zodResolver(seachSchema),
  });

  const searchFn = async (searchdata: searchType) => {
    if (searchdata) {
      await sdk.request(
        readItems("todos", {
          filter: {
            _or: [{ title: { _icontains: searchType } }],
          },
        }),
      );

      console.log(searchdata);
    }
  };

  //   const { data } = useQuery({
  //     queryKey: ["searchTodo"],
  //     queryFn: async () => {
  //       const abc = await sdk.request(readItems("todos", { search: searchType }));
  //       return abc;
  //     },
  //   });

  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit(searchFn)}>
          <Input {...register("title")} />
          <Button type="submit">
            <GhostIcon />
          </Button>
        </form>
      </div>

      <div className="">
        <div className="">
          {/* {searchType.map(() => {
            return (
              <>
                <div className=""></div>
              </>
            );
          })} */}
        </div>
      </div>
    </>
  );
};

export default Search;
