import { Button, Tooltip } from "@nextui-org/react";
import { RefreshCcw } from "lucide-react";
import { useQueryClient } from "react-query";
import {
  CATEGORIES_QUERY_KEY,
  PRODUCTS_QUERY_KEY,
  TAGS_QUERY_KEY,
} from "../utils/constants";

export const rowsPerPageOptions = [12, 18, 24, 30, 42, 54, 72, 96];

const ResultsWidget = ({
  rowsPerPage,
  setRowsPerPage,
  numberOfResults,
  changePage,
  onRefreshAction = () => {},
}) => {
  const queryClient = useQueryClient();

  return (
    <div className="flex items-center justify-between text-small text-default-400">
      {/* ------------ Results ------------ */}
      <span aria-label="Number of results">Results: {numberOfResults}</span>

      <div className="flex items-center">
        {/* ---------- Rows per page ---------- */}
        <label>Rows per page:</label>

        <select
          aria-label="Select items per page"
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="bg-transparent"
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* ---------- Refresh Button ---------- */}
        <Tooltip content="Refresh">
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className="ml-3"
            onClick={() => {
              queryClient.invalidateQueries([PRODUCTS_QUERY_KEY]);
              queryClient.invalidateQueries([CATEGORIES_QUERY_KEY]);
              queryClient.invalidateQueries([TAGS_QUERY_KEY]);

              // call back function
              onRefreshAction();

              changePage(1); // reset page to 1
            }}
          >
            <RefreshCcw width={20} height={20} className="text-default-400" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default ResultsWidget;
