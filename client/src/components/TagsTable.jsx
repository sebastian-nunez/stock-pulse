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
import useFilteredItems from "../hooks/useFilteredItems";
import { usePagination } from "../hooks/usePagination";
import useTags from "../hooks/useTags";
import TagsAPI from "../services/TagsAPI";
import {
  DEFAULT_ROWS_PER_PAGE_TABLE as DEFAULT_ROWS_PER_PAGE_TABLE_VIEW,
  TAGS_QUERY_KEY,
} from "../utils/constants";
import { sortItemsAscDesc } from "../utils/sorting";
import { Action } from "./ProductCard";
import ResultsWidget from "./ResultsWidget";
import TableDropdownActionMenu from "./TableDropdownActionMenu";
import TagDetailsModal from "./TagDetailsModal";
import TagEditableModal from "./TagEditableModal";
import TableSkeleton from "./skeletons/TableSkeleton";

// table columns. Key is the column name in the data, label is the visible column name in the table
const columns = [
  { key: "tag_id", label: "ID", sortable: true },
  { key: "name", label: "NAME", sortable: true },
  { key: "description", label: "DESCRIPTION", sortable: true },
  { key: "actions", label: "" },
];

const TagsTable = ({ filterText }) => {
  const queryClient = useQueryClient();

  // modal controls
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedAction, setSelectedAction] = useState(null);

  // state
  const [currentTag, setCurrentTag] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(
    DEFAULT_ROWS_PER_PAGE_TABLE_VIEW,
  );

  // retrieve the tags (via a FETCH) and sort them
  const sortedList = useAsyncList({
    async load() {
      // IMPORTANT: we have to FETCH to make sure items are available for sorting
      const tags = await queryClient.fetchQuery(
        [TAGS_QUERY_KEY],
        async () => {
          return await TagsAPI.getAllTags();
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([TAGS_QUERY_KEY]);
          },
        },
      );

      return {
        items: tags,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: sortItemsAscDesc(items, sortDescriptor),
      };
    },
  });

  const { deleteTag } = useTags({
    onSuccessAction: () => {
      sortedList.reload(); // reload the list
    },
  });

  // extract the tags from the sorted list
  const sortedTags = sortedList?.items;

  const filteredItems = useFilteredItems(sortedTags, filterText, [
    "name",
    "description",
  ]);

  const numberOfTags = filteredItems?.length;

  // pagination
  const { currentPage, numberOfPages, sliceRange, changePage } = usePagination(
    numberOfTags,
    rowsPerPage,
  );

  // memoized paginated tags
  const currentPageItems = useMemo(() => {
    const { start, end } = sliceRange;

    return filteredItems?.slice(start, end);
  }, [JSON.stringify(filteredItems), sliceRange.start, sliceRange.end]);

  const handleView = (tag) => {
    setCurrentTag(tag);
    setSelectedAction(Action.VIEW);

    onOpen(); // open the modal
  };

  const handleEdit = (tag) => {
    setCurrentTag(tag);
    setSelectedAction(Action.UPDATE);

    onOpen(); // open the modal
  };

  const handleDelete = (tagId) => {
    if (!tagId) {
      toast.error("Tag does not have a valid ID, unable to delete it!");
    }

    deleteTag.mutate(tagId);
  };

  // render the cell based on the column key
  const renderCell = useCallback((tag, columnKey) => {
    const cellValue = tag[columnKey];

    switch (columnKey) {
      case "actions":
        return (
          <TableDropdownActionMenu
            item={tag}
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
    deleteTag.isLoading ||
    (numberOfTags <= 0 && !filterText); // if there are no tags and no filter text, we are loading
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="flex min-h-screen flex-col justify-between gap-3 pb-4 drop-shadow-sm sm:px-0">
      <div className="mt-4 flex flex-col gap-2">
        {/* -------------- Table -------------- */}
        <Table
          aria-label="Tags Table"
          isHeaderSticky
          isCompact
          onSortChange={sortedList.sort}
          sortDescriptor={sortedList.sortDescriptor}
          topContent={
            <ResultsWidget
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              numberOfResults={numberOfTags}
              changePage={changePage}
              onRefreshAction={() => sortedList.reload()}
            />
          }
          bottomContent={
            !isLoading &&
            numberOfTags > 0 &&
            numberOfPages > 1 && (
              <Pagination
                showControls
                color="primary"
                initialPage={1}
                page={currentPage}
                total={numberOfPages}
                onChange={changePage}
                className="mx-auto"
              />
            )
          }
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
            {/* ---------------- ROWS --------------- */}
            {(tag, idx) => (
              <TableRow
                key={tag?.tag_id || idx}
                className="cursor-pointer hover:bg-default-100"
                onClick={() => handleView(tag)}
              >
                {(columnKey) => (
                  <TableCell>{renderCell(tag, columnKey)}</TableCell>
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
        <TagDetailsModal
          tag={currentTag}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}

      {selectedAction === Action.UPDATE && (
        <TagEditableModal
          title="Edit Tag"
          canDelete={true}
          tag={currentTag}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </div>
  );
};

export default TagsTable;
