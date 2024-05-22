import axios from "axios";

export const getAllProductBacklog = async () => {
  const url = "/product_backlog";
  const { data } = await axios.get(url);
  return data || [];
};

export const createProductBacklog = async ( product ) => {
  const url = "/product_backlog";
  console.log(product);
  return await axios.post(url, product);
};

export const deleteProductBacklog = async (id) => {
  const url = `/product_backlog/${id}`;
  return await axios.delete(url);
};
