import { Button } from "@nextui-org/react";
import { Card } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { Users } from "lucide-react";
import { useState } from "react";
import { requestJSON } from "../utils/api";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  const getUsers = async () => {
    setShowUsers(true);

    const users = await requestJSON("GET", "/api");
    setUsers([...JSON.stringify(users)]);
  };
  return (
    <>
      <section className="text-center">
        <h1 className="m-6 text-5xl font-bold">StockPulse</h1>

        <Button
          color="primary"
          radius="md"
          variant="shadow"
          startContent={<Users />}
          onClick={getUsers}
        >
          Get Users
        </Button>
      </section>

      <section className="mt-12 flex justify-center">
        {showUsers ? users.length > 0 ? <div>{users}</div> : <Spinner /> : null}
      </section>
    </>
  );
};

export default Home;
