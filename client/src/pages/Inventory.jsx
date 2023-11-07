import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ProductGrid from "../components/ProductGrid";
import ProductsAPI from "../services/ProductsAPI";

const PRODUCT_STALE_TIME = 5 * 60 * 1000; // 5 mins

const Inventory = () => {
  // state
  const [products, setProducts] = useState(null);

  // react-query
  const productsQuery = useQuery(["products"], ProductsAPI.getAllProducts, {
    staleTime: PRODUCT_STALE_TIME,
  });
  const fetchedProducts = productsQuery.data;

  // save the products to state
  useEffect(() => {
    setProducts(fetchedProducts);
  }, [fetchedProducts]);

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
