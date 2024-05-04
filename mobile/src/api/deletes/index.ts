import axios from "axios";
import { removeUser } from "storage/user/removeUser";
import { UserDTO } from "storage/user/userDTO";
import { backendUrl } from "utils/utils";


export const handleLogout = (user: UserDTO) => {
  const data = JSON.stringify(user);

  axios({ method: 'delete', data, url: backendUrl })
    .then(async () => {
      //      setResponseText("Deslogado com sucesso!");
      await removeUser()
    })
    .catch((error) => {
      console.error("Erro ao fazer DELETE:", error);
      //    setResponseText("Erro ao fazer logoff.");
    });

  //return responseText
};
