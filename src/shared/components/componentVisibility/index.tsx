import { FC, ReactNode } from "react";

type ComponentVisibilityProps = {
  appear: boolean;
  children: ReactNode;
};

const ComponentVisibility: FC<ComponentVisibilityProps> = ({
  appear,
  children,
}) => {
  return appear ? children : "";
};

export default ComponentVisibility;
