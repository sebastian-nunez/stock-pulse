import { Button } from "@nextui-org/react";
import { Card, User, CardBody } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { Users } from "lucide-react";
import { useState } from "react";
import UsersAPI from "../services/UsersAPI";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  const getUsers = async () => {
    setShowUsers(true);

    try {
      const users = await UsersAPI.getAllUsers();
      setUsers(users);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <>
      <section className="text-center">
        <h1 className="m-6 text-5xl font-bold">StockPulse</h1>

        <Button
          color="primary"
          radius="md"
          variant="shadow"
          startContent={!showUsers && <Users />}
          onClick={getUsers}
          isLoading={showUsers && users.length <= 0}
        >
          Get Users
        </Button>
      </section>

      <section className="m-12 grid grid-cols-2 gap-6">
        {users
          ? users.map((user) => (
              <Card key={user.id}>
                <CardBody>
                  <User
                    name={`${user.firstname} ${user.lastname}`}
                    description={user.role}
                    avatarProps={{
                      src: user.image,
                      size: "lg",
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
