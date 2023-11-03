import { Input } from "@nextui-org/react";
import { useQuery } from "react-query";
import CategoriesAPI from "../services/CategoriesAPI";
import TagsAPI from "../services/TagsAPI";

const ProductDetailsForm = ({ product, onFormChange, onSubmit }) => {
  const categoriesQuery = useQuery(["categories"], CategoriesAPI.getCategories);
  const categories = categoriesQuery.data;

  const tagsQuery = useQuery(["tags"], TagsAPI.getAllTags);
  const tags = tagsQuery.data;

  return (
    <form id="product-details-form" onChange={onFormChange} onSubmit={onSubmit}>
      <Input name="name" placeholder="Name" value={product.name} />
    </form>
  );
};

export default ProductDetailsForm;
