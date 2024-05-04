import axios from "axios";
import { backendUrl } from "utils/utils";
import { UserDTO } from "storage/user/userDTO";

export const handleLogin = async (username: string, password: string) => {
  // Dados que serão enviados no corpo da requisição POST
  const body = JSON.stringify({
    username,
    password,
  });

  return await new Promise<{ user: UserDTO, message: string }>((resolve, reject) => {
    axios({
      method: 'post',
      url: backendUrl + '/login', data: body
    })
      .then(async ({ data }) => {
        console.log(data);
        const response: { user: UserDTO, message: string } = {
          user: data.data,
          message: "Login realizado com sucesso!"
        }
        resolve(response)
      })
      .catch((error) => {
        reject("Erro ao efetuar login:" + error)
      });
  })


};
