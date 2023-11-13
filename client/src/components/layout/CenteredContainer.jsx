const CenteredContainer = ({ children }) => {
  return (
    <div className="mx-auto flex flex-col gap-4 px-6 sm:px-0 md:w-3/5 xl:w-1/3">
      {children}
    </div>
  );
};

export default CenteredContainer;
