import { Button } from "@nextui-org/react";
import { Card } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { Users } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  const getUsers = async () => {
    setShowUsers(true);

    const res = await fetch("/api");
    const text = await res.text();
    console.log(text);
  };
  return (
    <>
      <section className="text-center">
        <h1 className="font-bold text-5xl m-6">StockPulse</h1>

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

      <section className="flex justify-center mt-12">
        {showUsers ? users.length > 0 ? <div>users</div> : <Spinner /> : null}
      </section>
    </>
  );
};

export default Home;
