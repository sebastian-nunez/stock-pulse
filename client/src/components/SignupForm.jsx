import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signUpSchema } from "../utils/schemas";

const SignupForm = () => {
  const navigate = useNavigate();

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      // await AuthAPI.login(data);
      toast.success("You are now signed up!");
      navigate("/browser");
    } catch (error) {
      toast.error(error.response.data.message);
    }

    reset();
  };

  return (
    <form
      id="signup-form"
      className="flex flex-col gap-5"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* --------------- Username -------------- */}
      <Input
        {...register("username")}
        variant="bordered"
        type="text"
        label="Username"
        isClearable
        isRequired
        isInvalid={errors.username !== undefined}
        errorMessage={errors.username?.message}
        classNames={{
          inputWrapper: ["bg-white"],
          helperWrapper: ["bg-transparent"], // error message
        }}
      />

      {/* --------------- Email -------------- */}
      <Input
        {...register("email")}
        variant="bordered"
        type="email"
        label="Email"
        isClearable
        isRequired
        isInvalid={errors.email !== undefined}
        errorMessage={errors.email?.message}
        classNames={{
          inputWrapper: ["bg-white"],
          helperWrapper: ["bg-transparent"], // error message
        }}
      />

      {/* --------------- Password -------------- */}
      <Input
        {...register("password")}
        label="Password"
        variant="bordered"
        type={isVisible ? "text" : "password"}
        isRequired
        isInvalid={errors.password !== undefined}
        errorMessage={errors.password?.message}
        endContent={
          <button
            type="button"
            onClick={toggleVisibility}
            className="flex items-center justify-center focus:outline-none"
          >
            {isVisible ? (
              <Eye height={18} width={18} />
            ) : (
              <EyeOff height={18} width={18} />
            )}
          </button>
        }
        classNames={{
          inputWrapper: ["bg-white"],
          helperWrapper: ["bg-transparent"], // error message
        }}
      />

      {/* --------------- Confirm Password -------------- */}
      <Input
        {...register("confirmPassword")}
        label="Confirm Password"
        variant="bordered"
        type={isVisible ? "text" : "password"}
        isRequired
        isInvalid={errors.confirmPassword !== undefined}
        errorMessage={errors.confirmPassword?.message}
        endContent={
          <button
            type="button"
            onClick={toggleVisibility}
            className="flex items-center justify-center focus:outline-none"
          >
            {isVisible ? (
              <Eye height={18} width={18} />
            ) : (
              <EyeOff height={18} width={18} />
            )}
          </button>
        }
        classNames={{
          inputWrapper: ["bg-white"],
          helperWrapper: ["bg-transparent"], // error message
        }}
      />

      {/* --------------- Sign up Button -------------- */}
      <button
        type="submit"
        className="w-full rounded bg-blue-500 py-3 text-lg font-semibold text-white hover:bg-blue-600"
      >
        Sign up
      </button>
    </form>
  );
};

export default SignupForm;
