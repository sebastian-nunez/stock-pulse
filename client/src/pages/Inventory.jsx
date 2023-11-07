import { Button, Tooltip } from "@nextui-org/react";
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ErrorCard from "../components/ErrorCard";
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

  if (productsQuery.isError) {
    return (
      <ErrorCard
        message="Unable to fetch products"
        error={productsQuery.error?.message}
      />
    );
  }

  return (
    <>
      {/* --------------- Filters --------------- */}
      {/* TODO: create the filtering options */}
      <div className="my-6">
        Filtering Options
        <Tooltip content="Refresh">
          <Button
            size="sm"
            variant="flat"
            onPress={() => productsQuery.refetch()}
          >
            <RotateCcw />
          </Button>
        </Tooltip>
      </div>

      {/* ------------- Product Grid ------------- */}
      <div className="mx-break-out bg-neutral-50">
        {/* Change the full width background color */}
        <div className="container">{<ProductGrid products={products} />}</div>
      </div>
    </>
  );
};

export default Inventory;
