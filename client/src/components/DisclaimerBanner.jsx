const DisclaimerBanner = ({ children }) => {
  return (
    <div className="rounded border-l-4 border-yellow-500 bg-yellow-100 p-4">
      <p className="text-yellow-700">{children}</p>
    </div>
  );
};

export default DisclaimerBanner;
