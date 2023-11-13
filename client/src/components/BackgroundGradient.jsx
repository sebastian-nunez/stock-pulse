const BackgroundGradient = ({ variant }) => {
  const getGradient = (variant) => {
    switch (variant) {
      case "primary":
        return (
          <>
            <div className="absolute right-0 top-0 -z-10 h-[600px] w-[600px] rounded-[999px] bg-opacity-60 bg-gradient-to-r from-slate-100 via-teal-100 to-blue-300 blur-xl" />

            <div className="absolute inset-x-1/2 inset-y-1/4 -z-10 h-[40rem] w-[40rem] rounded-full bg-opacity-60 bg-gradient-to-bl from-indigo-200 via-purple-200 to-pink-200 blur-2xl" />

            <div className="absolute inset-x-0 inset-y-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-opacity-60 bg-gradient-to-br from-slate-100 via-purple-200 to-blue-300 blur-xl" />

            <div className="absolute bottom-0 left-1/4 -z-10 h-[40rem] w-[40rem] rounded-[999px] bg-opacity-60 bg-gradient-to-r from-red-200 via-gray-100 to-blue-100 blur-3xl " />
          </>
        );
      case "secondary":
        return (
          <>
            <div className="absolute inset-x-1/2 inset-y-1/4 -z-10 h-[40rem] w-[40rem] rounded-full bg-opacity-60 bg-gradient-to-bl from-indigo-200 via-purple-200 to-pink-200 blur-3xl" />

            <div className="absolute inset-x-0 inset-y-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-opacity-60 bg-gradient-to-br from-slate-100 via-purple-200 to-blue-300 blur-3xl" />

            <div className="absolute right-0 top-0 -z-10 h-[600px] w-[600px] rounded-[999px] bg-opacity-60 bg-gradient-to-r from-slate-100 via-teal-100 to-blue-300 blur-3xl" />

            <div className="absolute bottom-0 left-0 -z-10 h-[50rem] w-[50rem] rounded-[999px] bg-opacity-60 bg-gradient-to-r from-red-200 via-gray-100 to-blue-100 blur-3xl" />
          </>
        );
      case "accent":
        return (
          <>
            <div className="absolute inset-x-1/2 inset-y-1/4 -z-10 h-[40rem] w-[40rem] rounded-full bg-opacity-60 bg-gradient-to-bl from-indigo-200 via-purple-200 to-pink-200 blur-3xl" />

            <div className="absolute inset-x-0 inset-y-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-opacity-60 bg-gradient-to-br from-slate-100 via-purple-200 to-blue-300 blur-3xl" />
          </>
        );

      case "subtle":
        return (
          <>
            <div className="absolute inset-x-1/2 top-0 -z-10 h-[10rem] w-[20rem] rounded-full bg-opacity-60 bg-gradient-to-r from-teal-100 via-purple-100 to-pink-400 blur-3xl" />

            <div className="absolute -left-1/4 top-1/2 -z-10 h-[800px] w-[800px] rounded-full bg-opacity-60 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-300 blur-3xl" />

            <div className="absolute -right-1/2 top-1/4 -z-10 h-[600px] w-[850px] rounded-full bg-opacity-60 bg-gradient-to-r from-slate-100 via-teal-100 to-blue-300 blur-3xl" />
          </>
        );
      default:
        return (
          <>
            <div className="absolute inset-x-1/2 inset-y-1/4 -z-10 h-[40rem] w-[40rem] rounded-full bg-opacity-60 bg-gradient-to-bl from-indigo-200 via-purple-200 to-pink-200 blur-3xl" />

            <div className="absolute inset-x-0 inset-y-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-opacity-60 bg-gradient-to-br from-slate-100 via-purple-200 to-blue-300 blur-2xl" />
          </>
        );
    }
  };

  return <>{getGradient(variant)}</>;
};

export default BackgroundGradient;
