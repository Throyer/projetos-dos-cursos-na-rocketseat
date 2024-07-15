import React, { FC } from "react";
import { SessionProvider } from "./session";

const Providers: FC = ({ children }) => (
  <SessionProvider>{children}</SessionProvider>
);

export default Providers;
