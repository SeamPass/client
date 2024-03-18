import { TypographyClasses } from "../../@types";
import themes from "../../themes/typrography.themes";

interface IText
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  variant?: keyof TypographyClasses["variant"];
  weight?: keyof TypographyClasses["weight"];
  alignment?: keyof TypographyClasses["alignment"];
  size?: keyof TypographyClasses["size"];
  children?: React.ReactNode;
  className?: string;
}

const Text = ({
  variant,
  size,
  weight,
  alignment,
  children,
  className,
  ...rest
}: IText) => {
  return (
    <p
      className={`${className} ${size && themes.size[size]} ${
        alignment && themes.alignment[alignment]
      } ${weight && themes.weight[weight]} ${
        variant && themes.variant[variant]
      }`}
      {...rest}
    >
      {children}
    </p>
  );
};

export default Text;
