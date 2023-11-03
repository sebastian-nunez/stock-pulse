import { Input } from "@nextui-org/react";

const ProductDetailsForm = ({ product, onFormChange, onSubmit }) => {
  return (
    <form id="product-details-form" onChange={onFormChange} onSubmit={onSubmit}>
      <Input name="name" placeholder="Name" value={product.name} />
    </form>
  );
};

export default ProductDetailsForm;
