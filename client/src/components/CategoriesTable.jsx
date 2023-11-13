import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import useCategories from "../hooks/useCategories";
import useFilteredItems from "../hooks/useFilteredItems";
import { usePagination } from "../hooks/usePagination";
import CategoriesAPI from "../services/CategoriesAPI";
import {
  CATEGORIES_QUERY_KEY,
  DEFAULT_ROWS_PER_PAGE_TABLE as DEFAULT_ROWS_PER_PAGE_TABLE_VIEW,
} from "../utils/constants";
import { sortItemsAscDesc } from "../utils/sorting";
import CategoryDetailsModal from "./CategoryDetailsModal";
import CategoryEditableModal from "./CategoryEditableModal";
import { Action } from "./ProductCard";
import ResultsWidget from "./ResultsWidget";
import TableDropdownActionMenu from "./TableDropdownActionMenu";
import TableSkeleton from "./skeletons/TableSkeleton";

// table columns. Key is the column name in the data, label is the visible column name in the table
const columns = [
  { key: "category_id", label: "ID", sortable: true },
  { key: "name", label: "NAME", sortable: true },
  { key: "Description", label: "DESCRIPTION", sortable: true },
  { key: "actions", label: "ACTIONS" },
];

const CategoriesTable = ({ filterText }) => {
  const queryClient = useQueryClient();

  // modal controls
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedAction, setSelectedAction] = useState(null);

  // state
  const [currentCategory, setCurrentCategory] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(
    DEFAULT_ROWS_PER_PAGE_TABLE_VIEW,
  );

  // retrieve the categories (via a FETCH) and sort them
  const sortedList = useAsyncList({
    async load() {
      // IMPORTANT: we have to FETCH to make sure items are available for sorting
      const categories = await queryClient.fetchQuery(
        [CATEGORIES_QUERY_KEY],
        async () => {
          return await CategoriesAPI.getCategories();
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([CATEGORIES_QUERY_KEY]);
          },
        },
      );

      return {
        items: categories,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: sortItemsAscDesc(items, sortDescriptor),
      };
    },
  });

  const { deleteCategory } = useCategories({
    onSuccessAction: () => {
      sortedList.reload(); // reload the list
    },
  });

  // extract the categories from the sorted list
  const sortedCategories = sortedList?.items;

  const filteredItems = useFilteredItems(sortedCategories, filterText, [
    "name",
    "description",
  ]);

  const numberOfCategories = filteredItems?.length;

  // pagination
  const { currentPage, numberOfPages, sliceRange, changePage } = usePagination(
    numberOfCategories,
    rowsPerPage,
  );

  // memoized paginated categories
  const currentPageItems = useMemo(() => {
    const { start, end } = sliceRange;

    return filteredItems?.slice(start, end);
  }, [JSON.stringify(filteredItems), sliceRange.start, sliceRange.end]);

  const handleView = (category) => {
    setCurrentCategory(category);
    setSelectedAction(Action.VIEW);

    onOpen(); // open the modal
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setSelectedAction(Action.UPDATE);

    onOpen(); // open the modal
  };

  const handleDelete = (categoryId) => {
    if (!categoryId) {
      toast.error("Category does not have a valid ID, unable to delete it!");
    }

    deleteCategory.mutate(categoryId);
  };

  // render the cell based on the column key
  const renderCell = useCallback((category, columnKey) => {
    const cellValue = category[columnKey];

    switch (columnKey) {
      case "actions":
        return (
          <TableDropdownActionMenu
            item={category}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleView={handleView}
          />
        );
      default:
        return cellValue;
    }
  }, []);

  const isLoading =
    sortedList.isLoading ||
    deleteCategory.isLoading ||
    (numberOfCategories <= 0 && !filterText); // if there are no categories and no filter text, we are loading
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="flex min-h-screen flex-col justify-between gap-3 pb-4 drop-shadow-sm sm:px-0">
      <div className="mt-4 flex flex-col gap-2">
        {/* -------------- Table -------------- */}
        <Table
          aria-label="Categories Table"
          isHeaderSticky
          isCompact
          onSortChange={sortedList.sort}
          sortDescriptor={sortedList.sortDescriptor}
          topContent={
            <ResultsWidget
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              numberOfResults={numberOfCategories}
              changePage={changePage}
              onRefreshAction={() => sortedList.reload()}
            />
          }
          bottomContent={
            !isLoading &&
            numberOfCategories > 0 && (
              <Pagination
                showControls
                color="primary"
                showShadow
                page={currentPage}
                total={numberOfPages}
                onChange={changePage}
                className="mx-auto"
              />
            )
          }
          classNames={{
            table: "min-h-[400px]",
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                allowsSorting={column?.sortable === true}
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody
            items={isLoading ? [] : currentPageItems}
            emptyContent={"No rows to display."}
            isLoading={isLoading}
            loadingContent={<Spinner aria-label="Loading..." />}
          >
            {(category, idx) => (
              <TableRow
                key={category?.category_id || idx}
                className="cursor-pointer hover:bg-default-100"
                onClick={() => handleView(category)}
              >
                {(columnKey) => (
                  <TableCell>{renderCell(category, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* -------------- Pagination Controls -------------- */}
      <div className="mt-6 flex w-full justify-center"></div>

      {/* -------------- Modals -------------- */}
      {selectedAction === Action.VIEW && (
        <CategoryDetailsModal
          category={currentCategory}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}

      {selectedAction === Action.UPDATE && (
        <CategoryEditableModal
          title="Edit Category"
          canDelete={true}
          category={currentCategory}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </div>
  );
};

export default CategoriesTable;
