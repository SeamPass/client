export interface ButtonClasses {
  base: string;
  variant: {
    primary: string;
    secondary: string;
    error: string;
    tertiary: string;
  };
  size: {
    sm: string;
    md: string;
  };
}

export interface ButtonContainerClasses {
  base: string;
  variant: {
    primary: string;
  };
  size: {
    sm: string;
    md: string;
  };
}

export interface TypographyClasses {
  base?: string;
  variant: {
    primary?: string;
    ["primary-50"]?: string;
    ["primary-100"]?: string;
    ["primary-200"]?: string;
    secondary?: string;
    success?: string;
    tertiary?: string;
    warning?: string;
    error?: string;
  };
  size: {
    normal?: string;
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  weight: {
    regular?: string;
    medium?: string;
    bold?: string;
    bolder?: string;
    semibold?: string;
    light?: string;
    extralight?: string;
  };
  alignment: {
    center: string;
    left: string;
    right: string;
  };
  fontStyle: {
    italic: string;
  };
}

export interface HeaderClasses {
  base?: string;
  variant: {
    primary?: string;
    ["primary-100"]?: string;
    ["primary-200"]?: string;
    secondary?: string;
    success?: string;
    tertiary?: string;
    warning?: string;
    error?: string;
  };
  size: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  weight: {
    regular?: string;
    medium?: string;
    bold?: string;
    bolder?: string;
    semibold?: string;
    light?: string;
    extralight?: string;
  };
  alignment: {
    center: string;
    left: string;
    right: string;
  };
  fontStyle: {
    italic: string;
  };
}
