import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type UserType = {
  id: string;
  email: string;
  name: string;
  channelId: string;
  title: string;
  desc: string;
  avaterUrl: string;
  streamKey: string;
  followedChannel: string[];
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
