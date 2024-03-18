export type NavItem = {
  name: string;
  icon: React.JSX.Element;
  href: string;
}[];

export interface IErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}
