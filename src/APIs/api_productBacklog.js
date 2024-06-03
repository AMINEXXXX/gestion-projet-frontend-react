import axios from "axios";

export const getAllProductBacklog = async (id) => {
  const url = "/product_backlog";
  const { data } = await axios.get(url, id);
  return data || [];
};

export const getProductBacklogsById = async (id) => {
  const url = `/product_backlog/${id}`;
  console.log("id: ", id);
  const { data } = await axios.get(url);
  return data || [];
};

export const createProductBacklog = async (product) => {
  const url = "/product_backlog";
  console.log(product);
  return await axios.post(url, product);
};

export const updateProductBacklog = async (newProduct) => {
  console.log(newProduct);
  const url = `/product_backlog/${newProduct.id}`;
  return await axios.put(url, newProduct);
}

export const deleteProductBacklog = async (id) => {
  const url = `/product_backlog/${id}`;
  return await axios.delete(url);
};

export const createProductBacklogEtiquette = async (etiqutte) => {
  const url = "/product_backlog_etiquette";
  return await axios.post(url, etiqutte);
}

export const updateProductBacklogEtiquette = async (etiqutte) => {
  const url = `/product_backlog_etiquette/${etiqutte.id}`;
  return await axios.put(url, etiqutte);
}

export const deleteProductBacklogEtiquette = async (id) => {
  const url = `/product_backlog_etiquette/${id}`;
  return await axios.delete(url);
}
