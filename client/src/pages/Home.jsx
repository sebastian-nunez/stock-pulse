import { Button } from "@nextui-org/react";
import { Card, User, CardBody } from "@nextui-org/react";
import { Users } from "lucide-react";
import { useState } from "react";
import UsersAPI from "../services/UsersAPI";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);

    try {
      const users = await UsersAPI.getAllUsers();
      setUsers(users);
      setIsLoading(false);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

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
          startContent={!isLoading && <Users />}
          onClick={getUsers}
          isLoading={isLoading && users.length <= 0}
        >
          Get Users
        </Button>
      </section>

      <section className="m-12 grid grid-cols-2 gap-6">
        {users.length > 0
          ? users.map((user) => (
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
          : null}
      </section>
    </>
  );
};

export default Home;
