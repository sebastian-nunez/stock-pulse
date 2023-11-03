import {
  Button,
  Card,
  CardBody,
  Divider,
  Input,
  Select,
  SelectItem,
  Tooltip,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { Search, Users } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ProductDetailsModal from "../components/ProductDetailsModal";
import { default as ProductEditableModal } from "../components/ProductEditableModal";
import UsersAPI from "../services/UsersAPI";
import { MOCK_EXISTING_PRODUCT, MOCK_NEW_PRODUCT } from "../utils/mocks";

export const Action = {
  CREATE: "Create",
  VIEW: "View",
  UPDATE: "Update",
};

// selectedfilter enum
export const Filter = {
  PRODUCT: "Product",
  CATEGORY: "Category",
  TAG: "Tag",
};

const DEFAULT_USER = {
  firstname: null,
  lastname: null,
  role: null,
  image: null,
};

const Playground = () => {
  {
    /* --------------------------- Modals ---------------------------*/
  }
  // control the modals
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  {
    /* --------------------------- Users ---------------------------*/
  }
  const queryClient = useQueryClient();

  const createUser = useMutation(UsersAPI.createUser, {
    onSuccess: (userData) => {
      queryClient.invalidateQueries(["users"]);

      toast.success(
        `${userData.firstname} ${userData.lastname} successfully added!`,
      );
    },
  });

  const usersQuery = useQuery(["users"], UsersAPI.getAllUsers, {
    enabled: false,
  });
  const users = usersQuery.data;

  // state
  const [searchInput, setSearchInput] = useState("");
  const [user, setUser] = useState(DEFAULT_USER);

  // form submission
  const handleAddUser = (e) => {
    e.preventDefault();

    createUser.mutate(user);
    setUser(DEFAULT_USER);
  };

  // form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      <h1 className="pb-6 text-center text-5xl font-extrabold tracking-tighter">
        Playground
      </h1>

      {/* --------------------------- Modals ---------------------------*/}
      <section>
        <h2 className="pb-6 text-3xl font-extrabold">Modals</h2>

        {/* Form */}
        <div className="flex gap-4">
          {/* Action Selection */}
          <Select
            label="Action"
            variant="bordered"
            placeholder="Select an action"
            className="w-1/3"
            size="sm"
            onChange={(e) => setSelectedAction(e.target.value)}
          >
            {Object.values(Action).map((action) => (
              <SelectItem key={action}>{action}</SelectItem>
            ))}
          </Select>

          {/* Filter Selection */}
          <Select
            label="Filter"
            variant="bordered"
            placeholder="Select an filter"
            className="w-1/3"
            size="sm"
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            {Object.values(Filter).map((filter) => (
              <SelectItem key={filter}>{filter}</SelectItem>
            ))}
          </Select>
        </div>

        {/* Open Modal Button */}
        <Tooltip content="Open the modal" delay={300}>
          <Button
            color="primary"
            variant="shadow"
            className="mt-6 w-1/3"
            onPress={onOpen}
          >
            Open Modal
          </Button>
        </Tooltip>

        {/* Create a product */}
        {selectedFilter === Filter.PRODUCT &&
          selectedAction === Action.CREATE && (
            <ProductEditableModal
              title="Add Product"
              canDelete={false}
              product={MOCK_NEW_PRODUCT}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            />
          )}

        {/* Edit a product */}
        {selectedFilter === Filter.PRODUCT &&
          selectedAction === Action.UPDATE && (
            <ProductEditableModal
              title="Edit Product"
              product={MOCK_EXISTING_PRODUCT}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            />
          )}

        {/* View a product */}
        {selectedFilter === Filter.PRODUCT &&
          selectedAction === Action.VIEW && (
            <ProductDetailsModal
              product={MOCK_EXISTING_PRODUCT}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            />
          )}
      </section>

      <Divider className="my-12" />

      {/* --------------------------- Users ---------------------------*/}
      <section>
        <h2 className="pb-6 text-3xl font-extrabold">Users</h2>

        <Button
          color="primary"
          radius="md"
          variant="shadow"
          startContent={!usersQuery.isLoading && <Users />}
          onClick={() => usersQuery.refetch()}
          isLoading={usersQuery.isLoading}
          className="mx-auto w-1/3"
        >
          Get Users
        </Button>

        {/* ------------ Filter Options -------------- */}
        {usersQuery.isSuccess && (
          <div className="my-6 flex justify-end gap-6">
            <Input
              type="text"
              name="name"
              placeholder="Tim Cook"
              variant="bordered"
              startContent={<Search className="text-default-400" />}
              className="w-1/3"
              value={searchInput}
              onValueChange={setSearchInput}
            />
          </div>
        )}

        {/* ------------ User Grid -------------- */}
        <div className="grid grid-cols-3 gap-6">
          {users?.length > 0
            ? users
                .filter((user) => {
                  const normalizedInput = searchInput.trim().toLowerCase();
                  const firstName = user.firstname.trim().toLowerCase();
                  const lastName = user.lastname.trim().toLowerCase();
                  const fullName = `${firstName} ${lastName}`;

                  return (
                    firstName.startsWith(normalizedInput) ||
                    lastName.startsWith(normalizedInput) ||
                    fullName.startsWith(normalizedInput)
                  );
                })
                .map((user) => (
                  <Card key={user.id}>
                    <CardBody className="flex flex-row">
                      <User
                        name={`${user.firstname} ${user.lastname}`}
                        description={user.role}
                        avatarProps={{
                          src: user.image,
                          size: "lg",
                          isBordered: true,
                          isFocusable: true,
                          showFallback: true,
                        }}
                      />
                    </CardBody>
                  </Card>
                ))
            : usersQuery.isError && (
                <div>ERROR: {usersQuery.error?.message}</div>
              )}
        </div>

        {/* ------------ Toaster Notification -------------- */}
        <Toaster position="top-right" />
      </section>
    </>
  );
};

export default Playground;
