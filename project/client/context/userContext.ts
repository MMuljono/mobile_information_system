import { createContext } from "react";

type userContext = {
  user: string;
  setUser: (s: string) => void;
};
const UserContext = createContext<userContext>({
  user: "",
  setUser: () => {},
});
export default UserContext;
