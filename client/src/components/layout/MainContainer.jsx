const MainContainer = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      <main className="container min-h-screen p-4">{children}</main>
    </div>
  );
};

export default MainContainer;
