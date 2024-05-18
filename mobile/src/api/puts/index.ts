import axios, { AxiosError } from "axios";
import { backendUrl } from "utils/utils";
import { Models } from "..";
import { removeUser } from "storage/user/removeUser";


export const handleLogout = async () => {
  return await new Promise<{ message: string }>((resolve, reject) => {
    axios.put(backendUrl + '/logout')
      .then(async () => {
        await removeUser()
        resolve({ message: "Deslogado com sucesso!" });
      })
      .catch((error) => {
        reject("Erro ao fazer logoff:" + (error as AxiosError).response?.data);
      });
  })

};

export const handleUpdateEmployee = async (token: string, employee: Models.Employee) => {
  const body = JSON.stringify({
    employee,
  });

  return await new Promise<{ message: string }>((resolve, reject) => {
    axios.put(backendUrl + '/updateEmployee', body, {
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
        reject("Erro ao atualizar funcionário:" + (error as AxiosError).response?.data)
      });
  })
};

export const handleUpdateProduct = async (token: string, product: Models.Product) => {
  const body = JSON.stringify({
    product,
  });

  return await new Promise<{ message: string }>((resolve, reject) => {
    axios.put(backendUrl + '/updateProduct', body, {
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
        reject("Erro ao atualizar produto:" + (error as AxiosError).response?.data)
      });
  })
};

export const handleUpdateOrder = async (token: string, order: Models.Order) => {
  const body = JSON.stringify({
    order,
  });

  return await new Promise<{ message: string }>((resolve, reject) => {
    axios.put(backendUrl + '/updateOrder', body, {
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
        reject("Erro ao atualizar pedido:" + (error as AxiosError).response?.data)
      });
  })
};

export const handleUpdateOrderItem = async (token: string, orderItem: Models.OrderItem) => {
  const body = JSON.stringify({
    orderItem,
  });

  return await new Promise<{ message: string }>((resolve, reject) => {
    axios.put(backendUrl + '/updateOrderItem', body, {
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
        reject("Erro ao atualizar item do pedido:" + (error as AxiosError).response?.data)
      });
  })
};
