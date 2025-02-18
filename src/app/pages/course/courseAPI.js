import { env } from "../../../env";
const axios = require("axios").default;

const URL = `${env.REACT_APP_API_URL}/api/principal-area`;

export const getAll = (payload) => {
  return axios
    .get(`${URL}/search`, {
      params: payload,
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error.message);
      }
    });
};

export const getId = (id) => {
  return axios
    .get(`${URL}/get`, {
      params: id,
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error.message);
      }
    });
};

export const createItem = (payload) => {
  return axios.post(`${URL}/add`, payload).catch((error) => {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log(error.message);
    }
  });
};
export const updateItem = (payload) => {
  return axios.put(`${URL}/update`, payload).catch((error) => {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log(error.message);
    }
  });
};

export const deleteById = (payload) => {
  console.log(payload, "api");
  return axios.delete(`${URL}/delete`, { data: payload }).catch((error) => {
    if (error.response) {
      return error.response;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log(error.message);
    }
  });
};

export const uploadItemValidate = (payload) => {
  const formData = new FormData();
  formData.append(`file`, payload);

  return axios.post(`${URL}/uploadValidated`, formData).catch((error) => {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log(error.message);
    }
  });
};

export const upload = (payload) => {
  return axios.post(`${URL}/upload`, payload).catch((error) => {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log(error.message);
    }
  });
};
export const getExport = (payload) => {
  return axios
    .get(`${URL}/exportExcel`, {
      params: payload,
      responseType: "blob",
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error.message);
      }
    });
};
