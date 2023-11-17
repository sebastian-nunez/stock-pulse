import { useAutoAnimate } from "@formkit/auto-animate/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const DisclaimerBanner = ({
  children,
  durationSeconds = 20,
  initialDelaySeconds = 0.5,
}) => {
  const [isVisible, setIsVisible] = useState(initialDelaySeconds === 0);
  const [parent, enableAnimations] = useAutoAnimate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  // remove disclaimer after
  useEffect(() => {
    const id = setTimeout(() => {
      setIsVisible(false);
    }, durationSeconds * 1000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  // show disclaimer after a delay
  useEffect(() => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, initialDelaySeconds * 1000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <div ref={parent}>
      {isVisible ? (
        <div className="rounded border-l-4 border-yellow-500 bg-yellow-100 p-4 text-sm text-yellow-700 drop-shadow">
          <h1 className="flex items-center justify-between">
            <strong>DISCLAIMER</strong>

            <button
              aria-label="Close banner"
              onClick={toggleVisibility}
              className="cursor-pointer text-yellow-700"
            >
              <span>{<X height={20} />}</span>
            </button>
          </h1>

          <p>{children}</p>
        </div>
      ) : null}
    </div>
  );
};

export default DisclaimerBanner;
