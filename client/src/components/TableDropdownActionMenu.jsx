import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { MoreVertical } from "lucide-react";

const TableDropdownActionMenu = ({
  product,
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
            onClick={() => handleView(product)}
          >
            View
          </DropdownItem>

          <DropdownItem
            aria-label="Edit"
            key={"Edit"}
            onClick={() => handleEdit(product)}
          >
            Edit
          </DropdownItem>

          <DropdownItem
            aria-label="Delete"
            key={"Delete"}
            onClick={() => handleDelete(product?.product_id)}
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
