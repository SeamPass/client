import { ButtonClasses } from "../../@types";
import themes from "../../themes/button.themes";
import { Loader } from "../loader";

interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: keyof ButtonClasses["variant"];
  size?: keyof ButtonClasses["size"];
  className?: string;
  children?: React.ReactNode;
  isPending?: boolean;
}

export const Button = ({
  children,
  // isLoading,
  variant,
  className,
  size,
  isPending,
  ...rest
}: IButtonProps) => {
  return (
    <button
      className={`${className}  ${
        themes.base
      } flex justify-center items-center     ${
        variant && themes.variant[variant]
      } ${size && themes.size[size]}`}
      {...rest}
    >
      {isPending ? <Loader /> : children}
    </button>
  );
};
