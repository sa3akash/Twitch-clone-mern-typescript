import { FC, ReactNode } from "react";
import { useAuth } from "./store/auth";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export const Protected: FC<Props> = ({ children }) => {
  const user = useAuth((state) => state.user);
  return !user ? <Navigate to="/auth" /> : children;
};

export const SemiProtected: FC<Props> = ({ children }) => {
  const user = useAuth((state) => state.user);
  return user ? <Navigate to="/" /> : children;
};
