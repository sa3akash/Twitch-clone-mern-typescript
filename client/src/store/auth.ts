import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserType = {
  _id: string;
  name: string;
  email: string;
  token: string;
};

interface IAuthData {
  user: UserType | null;
  setUser: (agr: UserType | null) => void;
}

export const useAuth = create(
  persist<IAuthData>(
    (set) => ({
      user: null,
      setUser: (data) => set({ user: data }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
