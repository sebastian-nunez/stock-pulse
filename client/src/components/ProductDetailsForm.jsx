import { Input } from "@nextui-org/react";

const ProductDetailsForm = ({ product, onFormChange }) => {
  return (
    <form onChange={onFormChange}>
      <Input name="name" placeholder="Name" value={product.name} />
    </form>
  );
};

export default ProductDetailsForm;
