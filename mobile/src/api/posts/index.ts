import axios, { AxiosError } from "axios";
import { getBackendUrl } from "utils/index";
import { UserDTO } from "storage/user/userDTO";
import { Models } from "..";

export const handleLogin = async (username: string, password: string) => {
  const backendUrl = await getBackendUrl();

  const body = JSON.stringify({
    username,
    password,
  });

  return await new Promise<{ user: UserDTO; message: string }>(
    (resolve, reject) => {
      if (!backendUrl || !backendUrl?.length) {
        reject("Cadastre o IP do servidor antes de logar!");
      }

      axios
        .post(backendUrl + "/login", body)
        .then(async ({ data }) => {
          const response: { user: UserDTO; message: string } = {
            user: data.data,
            message: "Login realizado com sucesso!",
          };
          resolve(response);
        })
        .catch((error) => {
          reject(
            "Erro ao efetuar login:" + (error as AxiosError).response?.data
          );
        });
    }
  );
};

export const handleInsertEmployee = async (
  token: string,
  employee: Models.Employee
) => {
  const backendUrl = await getBackendUrl();

  const body = JSON.stringify(employee);

  return await new Promise<{ message: string }>((resolve, reject) => {
    axios
      .post(backendUrl + "/addEmployee", body, {
        headers: {
          Authorization: token,
        },
      })
      .then(async ({ data }) => {
        const response: { message: string } = {
          ...data,
        };
        resolve(response);
      })
      .catch((error) => {
        reject(
          "Erro ao inserir funcionário:" + (error as AxiosError).response?.data
        );
      });
  });
};

export const handleInsertProduct = async (
  token: string,
  product: Models.Product
) => {
  const backendUrl = await getBackendUrl();

  const body = JSON.stringify(product);

  return await new Promise<{ message: string }>((resolve, reject) => {
    axios
      .post(backendUrl + "/addProduct", body, {
        headers: {
          Authorization: token,
        },
      })
      .then(async ({ data }) => {
        const response: { message: string } = {
          ...data,
        };
        resolve(response);
      })
      .catch((error) => {
        reject(
          "Erro ao inserir produto:" + (error as AxiosError).response?.data
        );
      });
  });
};

export const handleInsertOrder = async (
  token: string,
  order: Models.OrderResponse
) => {
  const backendUrl = await getBackendUrl();
  const body = JSON.stringify(order);

  return await new Promise<{ message: string }>((resolve, reject) => {
    axios
      .post(backendUrl + "/addOrder", body, {
        headers: {
          Authorization: token,
        },
      })
      .then(async ({ data }) => {
        const response: { message: string } = {
          ...data,
        };
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(
          "Erro ao inserir pedido:" + (error as AxiosError).response?.data
        );
      });
  });
};

export const handleInsertOrderItem = async (
  token: string,
  orderItem: Models.OrderItem
) => {
  const backendUrl = await getBackendUrl();
  const body = JSON.stringify(orderItem);

  return await new Promise<{ message: string }>((resolve, reject) => {
    axios
      .post(backendUrl + "/addOrderItem", body, {
        headers: {
          Authorization: token,
        },
      })
      .then(async ({ data }) => {
        const response: { message: string } = {
          ...data,
        };
        resolve(response);
      })
      .catch((error) => {
        reject(
          "Erro ao inserir item do pedido:" +
            (error as AxiosError).response?.data
        );
      });
  });
};
