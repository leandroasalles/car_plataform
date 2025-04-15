import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className=" w-full h-full m-auto pb-10 md:pb-20">{children}</div>;
}
