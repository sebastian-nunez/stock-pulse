import { zodResolver } from "@hookform/resolvers/zod";
import {
  Chip,
  Input,
  Select,
  SelectItem,
  Spinner,
  Switch,
  Textarea,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import CategoriesAPI from "../services/CategoriesAPI";
import TagsAPI from "../services/TagsAPI";
import { productSchema } from "../utils/schemas";

const ProductDetailsForm = ({ product, onSubmit }) => {
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  // react-query
  const categoriesQuery = useQuery(["categories"], CategoriesAPI.getCategories);
  const categories = categoriesQuery.data;

  const tagsQuery = useQuery(["tags"], TagsAPI.getAllTags);
  const tags = tagsQuery.data;

  // loading state
  if (categoriesQuery.isLoading || tagsQuery.isLoading) {
    return <Spinner size="md" color="primary" label="Loading..." />;
  }

  return (
    <form
      id="product-details-form"
      onSubmit={handleSubmit(onSubmit)}
      novalidate="novalidate"
      className="flex flex-col gap-3"
    >
      <div className="flex gap-3">
        {/* ---------- Name ---------- */}
        <Input
          {...register("name")}
          defaultValue={product?.name}
          type="text"
          placeholder="Air Jordan 1 Retro"
          label="Name"
          variant="bordered"
          isInvalid={errors.name !== undefined}
          errorMessage={errors.name?.message}
          className="w-4/5"
          isRequired
        />

        {/* ---------- Availability ---------- */}
        <div className="flex w-1/5 min-w-fit flex-col justify-between gap-2 rounded-xl border-2 align-middle drop-shadow-sm hover:border-zinc-400 sm:flex-row">
          <label className="my-auto ml-3 text-center text-xs font-semibold text-zinc-500">
            Available
          </label>

          <Switch
            {...register("is_available")}
            size="sm"
            defaultSelected={
              product?.is_available !== undefined ? product.is_available : true
            } // product is available by default
            onValueChange={(value) => setValue("is_available", value)}
            className="mx-auto"
          />
          <em>{errors?.is_available?.message}</em>
        </div>
      </div>

      <div className="flex gap-3">
        {/* ---------- Brand ---------- */}
        <Input
          {...register("brand")}
          defaultValue={product?.brand}
          type="text"
          placeholder="Nike"
          label="Brand"
          variant="bordered"
          isInvalid={errors.brand !== undefined}
          errorMessage={errors.brand?.message}
          className="w-1/2"
          isRequired
        />

        {/* ---------- Category ---------- */}
        <Select
          {...register("category")}
          defaultSelectedKeys={product?.category && new Set([product.category])}
          label="Category"
          placeholder="Select a category"
          variant="bordered"
          isInvalid={errors.category !== undefined}
          errorMessage={errors.category?.message}
          isRequired
          className="w-1/2"
        >
          {categories &&
            categories.map((category) => (
              <SelectItem
                key={category.name}
                textValue={category?.name || "EMPTY"}
              >
                {category.name}
              </SelectItem>
            ))}
        </Select>
      </div>

      <div className="flex gap-3">
        {/* ---------- Price ---------- */}
        <Input
          {...register("price", { valueAsNumber: true })}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-small text-default-400">$</span>
            </div>
          }
          defaultValue={product?.price} // remove $ sign from price
          type="number"
          min={0}
          step={0.01}
          placeholder="0.00"
          label="Price"
          variant="bordered"
          isInvalid={errors.price !== undefined}
          errorMessage={errors.price?.message}
          className="w-1/2"
          isRequired
        />

        {/* ---------- Quantity ---------- */}
        <Input
          {...register("quantity", { valueAsNumber: true })}
          defaultValue={product?.quantity}
          type="number"
          placeholder="0"
          min={0}
          step={1}
          label="Quantity"
          variant="bordered"
          isInvalid={errors.quantity !== undefined}
          errorMessage={errors.quantity?.message}
          className="w-1/2"
          isRequired
        />
      </div>

      <div className="flex gap-3">
        {/* ---------- Weight ---------- */}
        <Input
          {...register("weight", { valueAsNumber: true })}
          defaultValue={product?.weight}
          type="number"
          placeholder="0.00"
          min={0.0}
          step={0.5}
          label="Weight (lbs)"
          variant="bordered"
          isInvalid={errors.weight !== undefined}
          errorMessage={errors.weight?.message}
          className="w-1/2"
          isRequired
        />

        {/* ---------- Dimensions ---------- */}
        <Input
          {...register("dimensions")}
          defaultValue={product?.dimensions}
          type="text"
          placeholder="Length x Width x Height"
          label="Dimensions (in)"
          variant="bordered"
          isInvalid={errors.dimensions !== undefined}
          errorMessage={errors.dimensions?.message}
          className="w-1/2"
          isRequired
        />
      </div>

      {/* ---------- Image ---------- */}
      <Input
        {...register("image")}
        defaultValue={product?.image}
        type="text"
        placeholder="https://"
        label="Image"
        variant="bordered"
        isInvalid={errors.image !== undefined}
        errorMessage={errors.image?.message}
        isRequired
        isClearable
      />

      {/* ---------- Description ---------- */}
      <Textarea
        {...register("description")}
        defaultValue={product?.description}
        label="Description"
        placeholder="Enter product description here..."
        minRows={2}
        maxRows={3}
        variant="bordered"
        isInvalid={errors.description !== undefined}
        errorMessage={errors.description?.message}
        isRequired
      />

      {/* ---------- Warranty Information ---------- */}
      <Textarea
        {...register("warranty_info")}
        defaultValue={product?.warranty_info}
        label="Warranty Info"
        placeholder="Enter warranty information here..."
        minRows={1}
        maxRows={2}
        variant="bordered"
        isInvalid={errors.warranty_info !== undefined}
        errorMessage={errors.warranty_info?.message}
        isRequired
      />

      {/* ---------- Notes ---------- */}
      <Textarea
        {...register("notes")}
        defaultValue={product?.notes}
        label="Notes"
        placeholder="Enter product notes here..."
        maxRows={4}
        variant="bordered"
        isInvalid={errors.notes !== undefined}
        errorMessage={errors.notes?.message}
        isRequired
      />

      {/* ---------- Tags ---------- */}
      <Select
        {...register("tags")}
        defaultSelectedKeys={tags && product?.tags && new Set(product.tags)}
        label="Tags"
        items={tags}
        variant="bordered"
        onChange={
          // convert comma-separated string to array of strings
          (e) => {
            const selectedTags = e.target.value;

            if (selectedTags?.length > 0) {
              setValue("tags", selectedTags.split(","));
            } else {
              setValue("tags", []);
            }
          }
        }
        isMultiline={true}
        selectionMode="multiple"
        placeholder="Select a tag"
        renderValue={(selectedItems) => {
          // selected tags
          return (
            <div className="flex flex-wrap gap-2">
              {selectedItems.map((item) => (
                <Chip key={item.key} size="sm" color="primary" className="mt-1">
                  {item.key}
                </Chip>
              ))}
            </div>
          );
        }}
      >
        {/* Tag options */}
        {tags &&
          tags.map((tag) => (
            <SelectItem key={tag.name} textValue={tag.name}>
              {tag.name}
            </SelectItem>
          ))}
      </Select>
    </form>
  );
};

export default ProductDetailsForm;
