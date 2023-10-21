import { Button } from "@nextui-org/react";
import { Card, User, CardBody } from "@nextui-org/react";
import { Users } from "lucide-react";
import UsersAPI from "../services/UsersAPI";
import { useQuery } from "react-query";
import { Search } from "lucide-react";
import { Input } from "@nextui-org/react";
import { useState } from "react";

const Home = () => {
  const usersQuery = useQuery(["users"], UsersAPI.getAllUsers, {
    enabled: false,
  });
  const users = usersQuery.data;

  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <section className="text-center">
        <h1 className="mb-6 mt-12 text-6xl font-extrabold tracking-tighter">
          StockPulse
        </h1>

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

      <div className="my-6 flex justify-end gap-6">
        {usersQuery.isSuccess && (
          <Input
            type="text"
            name="name"
            placeholder="Benito Martinez"
            variant="bordered"
            startContent={<Search className="text-default-400" />}
            className="mr-6 w-1/4"
            value={searchInput}
            onValueChange={setSearchInput}
          />
        )}
      </div>

      <section className="mx-6 grid grid-cols-2 gap-6">
        {users?.length > 0
          ? users
              .filter((user) => {
                const normalizedInput = searchInput.trim().toLowerCase();
                const fullName = `${user.firstname} ${user.lastname}`
                  .trim()
                  .toLowerCase();

                return fullName.includes(normalizedInput);
              })
              .map((user) => (
                <Card key={user.id}>
                  <CardBody>
                    <User
                      name={`${user.firstname} ${user.lastname}`}
                      description={user.role}
                      avatarProps={{
                        src: user.image,
                        size: "lg",
                        isBordered: true,
                        isFocusable: true,
                      }}
                    />
                  </CardBody>
                </Card>
              ))
          : usersQuery.isError && <div>ERROR: {usersQuery.error?.message}</div>}
      </section>
    </>
  );
};

export default Home;
