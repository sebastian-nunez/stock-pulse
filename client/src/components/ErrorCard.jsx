import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import { ServerCrash } from "lucide-react";

const ErrorCard = ({ error, message }) => {
  return (
    <Card className="mx-auto mt-5 w-full max-w-lg">
      <CardHeader className="flex items-center gap-3">
        <ServerCrash width={45} height={45} />
        <div className="flex flex-col">
          <p className="text-2xl font-bold">Whoops!</p>
          <p className="text-small text-default-500">Something went wrong...</p>
        </div>
      </CardHeader>

      <Divider />

      <CardBody>
        {message && (
          <>
            <p>
              <strong>
                Message: <br />
              </strong>
              {message}
            </p>

            <br />
          </>
        )}

        {error && (
          <p>
            <strong>
              Error: <br />
            </strong>
            {error}
          </p>
        )}
      </CardBody>

      <Divider />

      <CardFooter>
        <Link showAnchorIcon href="/">
          Go back home
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
