import { Divider } from "@nextui-org/react";

const InfoPanel = ({ children, title }) => {
  return (
    <div className="rounded-xl border px-6 py-4 hover:cursor-context-menu hover:border-gray-300 hover:shadow-sm">
      <h1 className="text-xl font-bold tracking-tight">{title}</h1>
      <Divider className="mb-1" />
      {children}
    </div>
  );
};

export default InfoPanel;
