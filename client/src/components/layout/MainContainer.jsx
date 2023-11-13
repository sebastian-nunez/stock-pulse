const MainContainer = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      <main className="min-h-screen px-4 py-4 2xl:container lg:px-6">
        {children}
      </main>
    </div>
  );
};

export default MainContainer;
