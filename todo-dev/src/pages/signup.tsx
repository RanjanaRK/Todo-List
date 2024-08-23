import { sdk } from "@/utils/sdk";
import { RegisterSchemaType } from "@/utils/types";
import { registerSchema } from "@/utils/zodSchema";
import { createUser } from "@directus/sdk";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Bounce, ToastContainer, toast } from "react-toastify";

const signup = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(registerSchema) });

  const loginHandleFn = async (fdata: RegisterSchemaType) => {
    try {
      await sdk.request(createUser(fdata));

      toast.success("successfully created ");

      console.log(fdata);

      router.push("/");
    } catch (error: any) {
      // console.log(error);
      toast.error(error.errors[0].message);
    }
  };
  return (
    <>
      <div className="grid h-screen place-items-center">
        <Card className="w-[350px] bg-white/70 backdrop-blur-sm sm:w-[500px]">
          <CardBody className="space-y-11">
            <div className="text-center font-mono text-2xl font-bold">
              Create an account
            </div>
            <form onSubmit={handleSubmit(loginHandleFn)}>
              <div className="space-y-6 px-6">
                <Input
                  defaultValue="73486f90-fb5d-47b2-8a7f-991598ef6354"
                  className="hidden"
                  {...register("role")}
                />
                <Input
                  {...register("first_name")}
                  isInvalid={errors.first_name ? true : false}
                  errorMessage={errors.first_name?.message}
                  color="primary"
                  type="text"
                  variant="flat"
                  label="FirstName"
                  size="sm"
                />
                <Input
                  {...register("last_name")}
                  isInvalid={errors.last_name ? true : false}
                  errorMessage={errors.last_name?.message}
                  color="primary"
                  type="text"
                  variant="flat"
                  label="LastName"
                  size="sm"
                />
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
                    size="md"
                    color="primary"
                    variant="solid"
                    radius="sm"
                    className="font-bold">
                    Create
                  </Button>
                </div>
              </div>
            </form>

            <div className="text-center">
              <span className="text-gray-600"> Already have an account?</span>
              <Link
                href="/"
                className="font-bold text-primary-500">
                Login
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default signup;
