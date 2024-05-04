
import axios from "axios";
import { backendUrl } from "utils/utils";
import { Models } from "api/index";

export const listEmployees = async (token: string, filter: Models.EmployeeListFilters) => {
  const body = JSON.stringify({
    ...filter
  })

  return await new Promise<Models.Employee[]>((resolve, reject) => {
    axios({
      method: 'put',
      headers: {
        Authorization: token
      },
      url: backendUrl + '/listEmployees', data: body
    })
      .then(({ data }) => {
        resolve(data.data)
      })
      .catch((error) => {
        reject(error)
      });
  })
}

export const listProducts = async (token: string, filter: Models.ProductListFilters) => {
  const body = JSON.stringify({
    ...filter
  })

  return await new Promise<Models.Product[]>((resolve, reject) => {
    axios({
      method: 'put',
      headers: {
        Authorization: token
      },
      url: backendUrl + '/listProducts', data: body
    })
      .then(({ data }) => {
        resolve(data.data)
      })
      .catch((error) => {
        reject(error)
      });
  })
}

export const listOrders = async (token: string, filter: Models.OrderListFilters) => {
  const body = JSON.stringify({
    ...filter
  })

  return await new Promise<Models.Order[]>((resolve, reject) => {
    axios({
      method: 'put',
      headers: {
        Authorization: token
      },
      url: backendUrl + '/listOrders', data: body
    })
      .then(({ data }) => {
        resolve(data.data)
      })
      .catch((error) => {
        reject(error)
      });
  })
}

export const isTokenValid = async (token: string) => {
  const data = JSON.stringify({
    token
  });

  return await new Promise<string>((resolve, reject) => {
    axios({
      method: 'get',
      url: backendUrl,
      data
    })
      .then(({ data }) => {
        resolve(data.message)
      })
      .catch(() => {
        reject('Token inválido!')
      });
  })
}


