import { useState } from "react";
import { useQuery } from "react-query";
import ProductGrid from "../components/ProductGrid";
import ProductsAPI from "../services/ProductsAPI";

const Inventory = () => {
  // state
  const [products, setProducts] = useState(null);

  // react-query
  const productsQuery = useQuery(["products"], ProductsAPI.getAllProducts, {
    onSuccess: (fetchedProducts) => {
      setProducts(fetchedProducts);
    },
  });

  // TODO: make a loading component (skeleton)
  if (productsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  // TODO: make a proper error component
  if (productsQuery.isError) {
    return (
      <div>
        <strong>Something went wrong:</strong> {productsQuery?.error?.message}
      </div>
    );
  }

  return (
    <>
      {/* --------------- Filters --------------- */}
      {/* TODO: create the filtering options */}
      <div>Filtering Options</div>

      {/* ------------- Product Grid ------------- */}
      {<ProductGrid products={products} />}
    </>
  );
};

export default Inventory;
