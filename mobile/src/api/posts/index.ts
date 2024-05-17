import axios, { AxiosError } from "axios";
import { backendUrl } from "utils/utils";
import { UserDTO } from "storage/user/userDTO";
import { Models } from "..";

export const handleLogin = async (username: string, password: string) => {
  const body = JSON.stringify({
    username,
    password,
  });

  return await new Promise<{ user: UserDTO, message: string }>((resolve, reject) => {
    axios.post(backendUrl + '/login', {
      method: 'post',
      data: body
    })
      .then(async ({ data }) => {
        const response: { user: UserDTO, message: string } = {
          user: data.data,
          message: "Login realizado com sucesso!"
        }
        resolve(response)
      })
      .catch((error) => {
        reject("Erro ao efetuar login:" + (error as AxiosError).response?.data)
      });
  })
};

export const handleInsertEmployee = async (token: string, employee: Models.Employee) => {
  const body = JSON.stringify({
    employee,
  });

  return await new Promise<{ message: string }>((resolve, reject) => {
    axios.post(backendUrl + '/addEmployee', body, {
      headers: {
        Authorization: token,
      },
    })
      .then(async ({ data }) => {
        const response: { message: string } = {
          ...data
        }
        resolve(response)
      })
      .catch((error) => {
        reject("Erro ao inserir funcionário:" + (error as AxiosError).response?.data)
      });
  })
};

export const handleInsertProduct = async (token: string, product: Models.Product) => {
  const body = JSON.stringify({
    product,
  });

  return await new Promise<{ message: string }>((resolve, reject) => {
    axios.post(backendUrl + '/addProduct', body, {
      headers: {
        Authorization: token,
      },
    })
      .then(async ({ data }) => {
        const response: { message: string } = {
          ...data
        }
        resolve(response)
      })
      .catch((error) => {
        reject("Erro ao inserir produto:" + (error as AxiosError).response?.data)
      });
  })
};

export const handleInsertOrder = async (token: string, order: Models.Order) => {
  const body = JSON.stringify({
    order,
  });

  return await new Promise<{ message: string }>((resolve, reject) => {
    axios.post(backendUrl + '/addOrder', body, {
      headers: {
        Authorization: token,
      },
    })
      .then(async ({ data }) => {
        const response: { message: string } = {
          ...data
        }
        resolve(response)
      })
      .catch((error) => {
        reject("Erro ao inserir pedido:" + (error as AxiosError).response?.data)
      });
  })
};

export const handleInsertOrderItem = async (token: string, orderItem: Models.OrderItem) => {
  const body = JSON.stringify({
    orderItem,
  });

  return await new Promise<{ message: string }>((resolve, reject) => {
    axios.post(backendUrl + '/addOrderItem', body, {
      headers: {
        Authorization: token,
      },
    })
      .then(async ({ data }) => {
        const response: { message: string } = {
          ...data
        }
        resolve(response)
      })
      .catch((error) => {
        reject("Erro ao inserir item do pedido:" + (error as AxiosError).response?.data)
      });
  })
};