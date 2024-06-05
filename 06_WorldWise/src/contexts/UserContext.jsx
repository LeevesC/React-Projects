/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <UserContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  return context;
}

export { UserProvider, useUser };
