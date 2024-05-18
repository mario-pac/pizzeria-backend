import axios, { AxiosError } from "axios";

import { removeUser } from "storage/user/removeUser";
import { UserDTO } from "storage/user/userDTO";
import { backendUrl } from "utils/utils";

export const handleRemoveEmployee = async (token: string, idEmployee: number) => {
  return await new Promise<{ message: string }>((resolve, reject) => {
    axios.delete(backendUrl + '/removeEmployee', {
      headers: {
        Authorization: token,
        "idEmployee": idEmployee
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

export const handleRemoveProduct = async (token: string, idProduct: number) => {
  return await new Promise<{ message: string }>((resolve, reject) => {
    axios.delete(backendUrl + '/removeProduct', {
      headers: {
        Authorization: token,
        "idProduct": idProduct
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

export const handleRemoveOrder = async (token: string, idOrder: number) => {
  return await new Promise<{ message: string }>((resolve, reject) => {
    axios.delete(backendUrl + '/removeOrder', {
      headers: {
        Authorization: token,
        "idOrder": idOrder
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

export const handleRemoveOrderItem = async (token: string, idOrderItem: number) => {
  return await new Promise<{ message: string }>((resolve, reject) => {
    axios.delete(backendUrl + '/removeOrderItem', {
      headers: {
        Authorization: token,
        'idOrderItem': idOrderItem
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
