import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link as UILink,
} from "@nextui-org/react";
import { ServerCrash } from "lucide-react";
import { Link } from "react-router-dom";
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
          <UILink as={Link} showAnchorIcon to="/">
            Go back home
          </UILink>
        </CardFooter>
      </Card>

      {/* ------------- Blurred Background --------------- */}
      <BackgroundGradient />
    </>
  );
};

export default ErrorCard;
