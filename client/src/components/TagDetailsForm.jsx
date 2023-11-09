import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { tagSchema } from "../utils/schemas";

const TagDetailsForm = ({ tag, onSubmit }) => {
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tagSchema),
  });

  return (
    <form
      id="tag-details-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-3"
    >
      {/* ---------- Name ---------- */}
      <Input
        {...register("name")}
        defaultValue={tag?.name}
        type="text"
        placeholder="New"
        label="Name"
        variant="bordered"
        isInvalid={errors.name !== undefined}
        errorMessage={errors.name?.message}
        isRequired
      />

      {/* ---------- Description ---------- */}
      <Textarea
        {...register("description")}
        defaultValue={tag?.description}
        label="Description"
        placeholder="Enter tag description here..."
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

export default TagDetailsForm;
