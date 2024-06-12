import axios, { AxiosError } from "axios";
import { getBackendUrl } from "utils/index";
import { Models } from "api/index";

// region LISTAS
export const listEmployees = async (
  token: string,
  filter: Models.EmployeeListFilters
) => {
  const backendUrl = await getBackendUrl();
  return await new Promise<Models.Employee[]>((resolve, reject) => {
    axios
      .get(backendUrl + "/listEmployees", {
        headers: {
          Authorization: token,
          name: filter.name ?? "",
          levelId: filter.levelId ?? "",
          idCompany: filter.idCompany,
        },
      })
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(
          "Erro ao buscar lista de funcionários:" +
            (error as AxiosError).response?.data
        );
      });
  });
};

export const listProducts = async (
  token: string,
  filter: Models.ProductListFilters
) => {
  const backendUrl = await getBackendUrl();
  return await new Promise<Models.Product[]>((resolve, reject) => {
    axios
      .get(backendUrl + "/listProducts", {
        headers: {
          Authorization: token,
          category: filter.category ?? "",
          description: filter.description ?? "",
          idCompany: filter.idCompany,
        },
      })
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(
          "Erro ao buscar lista de produtos:" +
            (error as AxiosError).response?.data
        );
      });
  });
};

export const listOrders = async (
  token: string,
  filter: Models.OrderListFilters
) => {
  const backendUrl = await getBackendUrl();
  return await new Promise<Models.Order[]>((resolve, reject) => {
    axios
      .get(backendUrl + "/listEmployees", {
        headers: {
          Authorization: token,
          customerName: filter.customerName ?? "",
          createdAtInit: filter.createdAtInit?.toDateString() ?? "",
          createdAtFinal: filter.createdAtFinal?.toDateString() ?? "",
          employeeId: filter.employeeId ?? "",
          idStatus: filter.idStatus ?? "",
          idCompany: filter.idCompany,
        },
      })
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(
          "Erro ao buscar lista de pedidos:" +
            (error as AxiosError).response?.data
        );
      });
  });
};

export const listEmployeeLevels = async (token: string, idCompany: number) => {
  const backendUrl = await getBackendUrl();
  return await new Promise<Models.EmployeeLevel[]>((resolve, reject) => {
    axios
      .get(backendUrl + "/listEmployeeLevels", {
        headers: {
          Authorization: token,
          idCompany: idCompany,
        },
      })
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(
          "Erro ao buscar lista de níveis de funcionário:" +
            (error as AxiosError).response?.data
        );
      });
  });
};

export const listStatus = async (token: string) => {
  const backendUrl = await getBackendUrl();
  return await new Promise<Models.Status[]>((resolve, reject) => {
    axios
      .get(backendUrl + "/listStatus", {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(
          "Erro ao buscar lista de status de pedido:" +
            (error as AxiosError).response?.data
        );
      });
  });
};

export const listCompanies = async () => {
  const backendUrl = await getBackendUrl();
  return await new Promise<Models.Company[]>((resolve, reject) => {
    axios
      .get(backendUrl + "/listCompanies")
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(
          "Erro ao buscar lista de empresas:" +
            (error as AxiosError).response?.data
        );
      });
  });
};

export const listUsedDesks = async (token: string, idCompany: number) => {
  const backendUrl = await getBackendUrl();
  return await new Promise<number[]>((resolve, reject) => {
    axios
      .get(backendUrl + "/listUsedDesks", {
        headers: {
          Authorization: token,
          idCompany: idCompany ?? "",
        },
      })
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(
          "Erro ao buscar lista de mesas usadas:" +
            (error as AxiosError).response?.data
        );
      });
  });
};
// endregion

// region BY ID
export const companyById = async (token: string, id: number) => {
  const backendUrl = await getBackendUrl();
  return await new Promise<Models.Company>((resolve, reject) => {
    axios
      .get(backendUrl + "/companyById", {
        headers: {
          Authorization: token,
          idCompany: id ?? "",
        },
      })
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(
          "Erro ao buscar empresa por id:" +
            (error as AxiosError).response?.data
        );
      });
  });
};

export const employeeById = async (token: string, id: number) => {
  const backendUrl = await getBackendUrl();
  return await new Promise<Models.EmployeeResponse>((resolve, reject) => {
    axios
      .get(backendUrl + "/employeeById", {
        headers: {
          Authorization: token,
          idEmployee: id ?? "",
        },
      })
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(
          "Erro ao buscar funcionário por id:" +
            (error as AxiosError).response?.data
        );
      });
  });
};

export const productById = async (token: string, id: number) => {
  const backendUrl = await getBackendUrl();
  return await new Promise<Models.Product>((resolve, reject) => {
    axios
      .get(backendUrl + "/productById", {
        headers: {
          Authorization: token,
          idProduct: id ?? "",
        },
      })
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(
          "Erro ao buscar produto por id:" +
            (error as AxiosError).response?.data
        );
      });
  });
};

export const orderById = async (token: string, id: number) => {
  const backendUrl = await getBackendUrl();
  return await new Promise<Models.OrderResponse>((resolve, reject) => {
    axios
      .get(backendUrl + "/orderById", {
        headers: {
          Authorization: token,
          idOrder: id ?? "",
        },
      })
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(
          "Erro ao buscar pedido por id:" + (error as AxiosError).response?.data
        );
      });
  });
};

export const orderItemByIdsStatus = async (
  token: string,
  idsStatus: string[]
) => {
  const backendUrl = await getBackendUrl();
  return await new Promise<Models.OrderItemResponse[]>((resolve, reject) => {
    axios
      .get(backendUrl + "/orderById", {
        headers: {
          Authorization: token,
          ids: idsStatus ?? [],
        },
      })
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(
          "Erro ao buscar itens pelo id do pedido:" +
            (error as AxiosError).response?.data
        );
      });
  });
};

export const orderItemById = async (token: string, idOrderItem?: number) => {
  const backendUrl = await getBackendUrl();
  return await new Promise<Models.OrderItem>((resolve, reject) => {
    axios
      .get(backendUrl + "/orderItemById", {
        headers: {
          Authorization: token,
          idOrderItem: idOrderItem ?? "1",
        },
      })
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(
          "Erro ao buscar item do pedido por id:" +
            (error as AxiosError).response?.data
        );
      });
  });
};

export const getConfigsById = async (token: string, idConfig?: number) => {
  const backendUrl = await getBackendUrl();
  return await new Promise<Models.Settings>((resolve, reject) => {
    axios
      .get(backendUrl + "/configById", {
        headers: {
          Authorization: token,
          idConfig: idConfig ?? "1",
        },
      })
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(
          "Erro ao buscar configuração por id:" +
            (error as AxiosError).response?.data
        );
      });
  });
};

// endregion

// region SEQUENCE
export const getNextSequenceOrderItem = async (token: string) => {
  const backendUrl = await getBackendUrl();
  return await new Promise<{ message: string }>((resolve, reject) => {
    axios
      .get(backendUrl + "/getNextSequenceOrderItem", {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(
          "Erro ao buscar sequência de item de pedido:" +
            (error as AxiosError).response?.data
        );
      });
  });
};
// endregion

export const isTokenValid = async (token: string) => {
  const backendUrl = await getBackendUrl();
  return await new Promise<{ message: string }>((resolve, reject) => {
    axios
      .get(backendUrl + "/isTokenValid", {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        resolve(data.message);
      })
      .catch((error) => {
        reject("Erro ao validar token:" + (error as AxiosError).response?.data);
      });
  });
};
