import { isTokenValid } from "api/gets";
import LoadingPanel from "components/LoadingPanel";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "storage/user/getUser";
import { removeUser } from "storage/user/removeUser";
import { UserDTO } from "storage/user/userDTO";
import { showToast } from "utils/toast";
import { log } from "../log";

interface UserProps {
  children: JSX.Element;
}

interface UserData {
  user: UserDTO | undefined;
  setUser: (user: UserDTO | undefined) => void;
}

const UserContext = createContext({} as UserData);

const UserProvider: React.FC<UserProps> = ({ children }) => {
  const [user, setUser] = useState<UserDTO | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  async function gettingUser() {
    try {
      if (user) return;
      setLoading(true);
      const us = await getUser();
      if (us) {
        setUser(us);
      }
      await checkToken(us);
    } catch (error) {
      log.debug(error);
    } finally {
      setLoading(false);
    }
  }

  async function checkToken(user: UserDTO) {
    try {
      setLoading(true);
      if (user?.token.length) {
        const resp = await isTokenValid(user?.token);
        if (typeof resp === "undefined") {
          showToast("error", "Token inválido!");
          await removeUser();
          setUser(undefined);
        }
      }
    } catch (error) {
      console.warn(error);
      await removeUser();
      setUser(undefined);
      showToast("error", "Token inválido!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    gettingUser();
  }, []);

  if (loading) {
    return <LoadingPanel loading />;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useMe = (): UserData => {
  const context = useContext(UserContext);

  return context;
};

export { UserProvider, useMe };
