import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

const InfoPanel = ({ children, title, icon }) => {
  return (
    <Card shadow="sm" className="hover:cursor-context-menu">
      <CardHeader className="item-center flex gap-2">
        {icon}
        <div className="flex flex-col">
          <p className="text-xl font-bold tracking-tight">{title}</p>
        </div>
      </CardHeader>

      <Divider />

      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default InfoPanel;
