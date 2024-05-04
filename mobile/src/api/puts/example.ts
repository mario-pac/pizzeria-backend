import axios from "axios";
import { backendUrl } from "utils/utils";

const handlePutRequest = () => {
  // Dados que serão enviados no corpo da requisição PUT
  const putData = {
    name: "Novo Nome",
    email: "novo@email.com",
  };

  axios
    .put(backendUrl + "/1", putData) // Substitua '1' pelo ID correto
    .then((response) => {
      //setResponseText("Atualização bem-sucedida! Resposta: " + response.data);
    })
    .catch((error) => {
      console.error("Erro ao fazer PUT:", error);
      //setResponseText("Erro ao fazer a atualização.");
    });
};
