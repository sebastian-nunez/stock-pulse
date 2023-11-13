import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import { ServerCrash } from "lucide-react";
import BackgroundGradient from "./BackgroundGradient";

const ErrorCard = ({ error, message }) => {
  return (
    <>
      <Card className="drop-shadow-lg sm:mx-auto sm:w-1/2">
        <CardHeader className="flex items-center gap-3">
          <ServerCrash width={45} height={45} />
          <div className="flex flex-col">
            <p className="text-2xl font-bold">Whoops!</p>
            <p className="text-small text-default-500">
              Something went wrong...
            </p>
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

        <CardFooter>
          <Link showAnchorIcon href="/">
            Go back home
          </Link>
        </CardFooter>
      </Card>

      {/* ------------- Blurred Background --------------- */}
      <BackgroundGradient />
    </>
  );
};

export default ErrorCard;
