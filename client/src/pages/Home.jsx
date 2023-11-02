import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { Search, UserPlus2, Users } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import UsersAPI from "../services/UsersAPI";

const DEFAULT_USER = {
  firstname: null,
  lastname: null,
  role: null,
  image: null,
};

const Home = () => {
  // modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // use query
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
    <div className="py-6">
      {/* ------------ Heading -------------- */}
      <section className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tighter">Home</h1>
        <p className="pb-6 text-gray-500">We're working on it...</p>

        <Button
          color="primary"
          radius="md"
          variant="shadow"
          startContent={!usersQuery.isLoading && <Users />}
          onClick={() => usersQuery.refetch()}
          isLoading={usersQuery.isLoading}
        >
          Get Users
        </Button>
      </section>

      {/* ------------ Filter Options -------------- */}
      {usersQuery.isSuccess && (
        <div className="my-6 flex justify-end gap-6">
          <Tooltip content="Add a User" delay={300}>
            <Button
              color="primary"
              radius="sm"
              variant="ghost"
              onPress={onOpen}
              isDisabled={createUser.isLoading}
            >
              <UserPlus2 />
            </Button>
          </Tooltip>

          <Input
            type="text"
            name="name"
            placeholder="Tim Cook"
            variant="bordered"
            startContent={<Search className="text-default-400" />}
            className="mr-6 w-1/4"
            value={searchInput}
            onValueChange={setSearchInput}
          />
        </div>
      )}

      {/* ------------ User Grid -------------- */}
      <section className="m-6 grid grid-cols-3 gap-6">
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
          : usersQuery.isError && <div>ERROR: {usersQuery.error?.message}</div>}
      </section>

      {/* ------------ Modal -------------- */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <form onSubmit={handleAddUser}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add User
                </ModalHeader>

                <ModalBody>
                  <div className="flex gap-3">
                    <Input
                      type="text"
                      name="firstname"
                      label="Firstname"
                      variant="bordered"
                      onChange={handleChange}
                      isRequired
                    />
                    <Input
                      type="text"
                      name="lastname"
                      label="Lastname"
                      variant="bordered"
                      onChange={handleChange}
                      isRequired
                    />
                  </div>

                  <Input
                    type="text"
                    name="role"
                    label="Role"
                    variant="bordered"
                    onChange={handleChange}
                    isRequired
                  />
                  <Input
                    type="text"
                    name="image"
                    label="Image Link"
                    onChange={handleChange}
                    variant="bordered"
                    isClearable
                    description="Please provide a valid URL"
                  />
                </ModalBody>

                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>

                  <Button
                    color="primary"
                    variant="shadow"
                    onPress={onClose}
                    type="submit"
                  >
                    Add
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>

      {/* ------------ Toaster Notification -------------- */}
      <Toaster position="top-right" />
    </div>
  );
};

export default Home;
