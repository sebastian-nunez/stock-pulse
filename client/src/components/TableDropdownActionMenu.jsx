import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { MoreVertical } from "lucide-react";

const TableDropdownActionMenu = ({
  item,
  handleDelete,
  handleEdit,
  handleView,
}) => {
  return (
    <div className="relative flex items-center justify-end gap-2">
      <Dropdown aria-label="Actions Menu">
        <DropdownTrigger aria-label="Toggle Actions Menu">
          <Button isIconOnly size="sm" variant="light">
            <MoreVertical />
          </Button>
        </DropdownTrigger>

        <DropdownMenu aria-label="Menu Options">
          <DropdownItem
            aria-label="View"
            key={"View"}
            onClick={() => handleView(item)}
          >
            View
          </DropdownItem>

          <DropdownItem
            aria-label="Edit"
            key={"Edit"}
            onClick={() => handleEdit(item)}
          >
            Edit
          </DropdownItem>

          <DropdownItem
            aria-label="Delete"
            key={"Delete"}
            onClick={() =>
              handleDelete(
                item?.product_id || item?.category_id || item?.tag_id,
              )
            }
            className="text-danger"
            color="danger"
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default TableDropdownActionMenu;
