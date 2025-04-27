import { PropsWithChildren } from "react";

export const Content: React.FC<PropsWithChildren> = ({ children }) => {
  return <section className="flex-grow">{children}</section>;
};
