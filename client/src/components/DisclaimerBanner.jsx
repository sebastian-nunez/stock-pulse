import { X } from "lucide-react";
import { useEffect, useState } from "react";

const DisclaimerBanner = ({ children, durationSeconds = 5 }) => {
  const [isVisible, setIsVisible] = useState(true);

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

  if (!isVisible) return null;
  return (
    <div className="rounded border-l-4 border-yellow-500 bg-yellow-100 p-4 text-sm text-yellow-700 drop-shadow">
      <h1 className="flex items-center justify-between">
        <strong>DEMO DISCLAIMER</strong>

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
  );
};

export default DisclaimerBanner;
