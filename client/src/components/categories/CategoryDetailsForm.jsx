import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { categorySchema } from "../../utils/schemas";

const CategoryDetailsForm = ({ category, onSubmit }) => {
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  return (
    <form
      id="category-details-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-3"
    >
      {/* ---------- Name ---------- */}
      <Input
        {...register("name")}
        defaultValue={category?.name}
        type="text"
        placeholder="Men's apparel"
        label="Name"
        variant="bordered"
        isInvalid={errors.name !== undefined}
        errorMessage={errors.name?.message}
        isRequired
      />

      {/* ---------- Description ---------- */}
      <Textarea
        {...register("description")}
        defaultValue={category?.description}
        label="Description"
        placeholder="Enter category description here..."
        minRows={2}
        maxRows={3}
        variant="bordered"
        isInvalid={errors.description !== undefined}
        errorMessage={errors.description?.message}
        isRequired
      />
    </form>
  );
};

export default CategoryDetailsForm;
