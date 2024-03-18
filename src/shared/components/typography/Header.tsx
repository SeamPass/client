import React from "react";
import { HeaderClasses } from "../../@types";
import themes from "../../themes/header.themes";

interface IHeaderProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  size?: keyof HeaderClasses["size"];
  weight?: keyof HeaderClasses["weight"];
  variant?: keyof HeaderClasses["variant"];
  className?: string;
  children: React.ReactNode;
  alignment?: keyof HeaderClasses["alignment"];
}

const Header = ({
  className,
  children,
  size,
  weight,
  variant,
  alignment,
}: IHeaderProps) => {
  return (
    <h2
      className={`${variant && themes.variant[variant]} ${
        weight && themes.weight[weight]
      } ${size && themes.size[size]} ${className}
  ${alignment && themes.alignment[alignment]}
      
      `}
    >
      {children}
    </h2>
  );
};

export default Header;
