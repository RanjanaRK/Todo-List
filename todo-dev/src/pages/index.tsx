import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { LoginSchemaType } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/zodSchema";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { sdk } from "@/utils/sdk";
import { login } from "@directus/sdk";
import { toast, ToastContainer } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const index = () => {
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const loginHandleFn = async (fdata: LoginSchemaType) => {
    try {
      await sdk.request(
        login(fdata.email, fdata.password, {
          mode: "session",
        }),
      );

      // console.log(fdata);

      toast.success("loginnnnnnn");
      reset();

      router.push("/todo");
    } catch (error: any) {
      toast.error(`${error.errors[0].message}`);
    }
  };

  return (
    <>
      <div className="grid h-screen place-items-center">
        <Card className="w-[350px] bg-white/70 backdrop-blur-sm sm:w-[500px]">
          <CardBody className="space-y-11">
            <div className="text-center font-mono text-2xl font-bold">
              Login to continue
            </div>
            <form onSubmit={handleSubmit(loginHandleFn)}>
              <div className="space-y-6 px-6">
                <Input
                  {...register("email")}
                  isInvalid={errors.email ? true : false}
                  errorMessage={errors.email?.message}
                  color="primary"
                  type="email"
                  variant="flat"
                  label="Email"
                  size="sm"
                />
                <Input
                  {...register("password")}
                  isInvalid={errors.password ? true : false}
                  errorMessage={errors.password?.message}
                  color="primary"
                  variant="flat"
                  label="Password"
                  size="sm"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => setIsVisible(!isVisible)}>
                      {isVisible ? (
                        <Eye className="stroke-blue-600" />
                      ) : (
                        <EyeOff className="stroke-blue-600" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                />
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    size="md"
                    color="primary"
                    variant="solid"
                    radius="sm"
                    className="font-bold">
                    Log in
                  </Button>
                </div>
              </div>
            </form>

            <div className="text-center">
              <span className="text-gray-600"> Don't have an account?</span>
              <Link
                href="/signup"
                className="font-bold text-primary-500">
                Register
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default index;
