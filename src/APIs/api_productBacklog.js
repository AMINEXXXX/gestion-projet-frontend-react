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
