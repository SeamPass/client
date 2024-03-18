import { ButtonClasses } from "../../@types";
import themes from "../../themes/button.themes";

interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: keyof ButtonClasses["variant"];
  size?: keyof ButtonClasses["size"];
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
}

export const Button = ({
  children,
  // isLoading,
  variant,
  className,
  size,
  ...rest
}: IButtonProps) => {
  return (
    <button
      className={`${className}  ${themes.base}     ${
        variant && themes.variant[variant]
      } ${size && themes.size[size]}`}
      {...rest}
    >
      {children}
    </button>
  );
};
