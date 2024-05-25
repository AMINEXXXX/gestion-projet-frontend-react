import React from "react";
import { useSelector } from "react-redux";
import { useGetProductBacklogById } from "../../../../hooks/api/useProductBacklogApi";
import DeleteProduct from "./DeleteProduct";
import { Box } from "@mui/material";
import ProductInfo from "./ProductInfo";

function createData(id, name, description, userStories) {
  return { id, name, description, userStories };
}

export default function useAllProducts() {
  const { project } = useSelector((state) => state.project);
  const { data } = useGetProductBacklogById(project.id);

  const productsData = data?.map((e) =>
    createData(e.id, e.name, e.description, e.userStories)
  );

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: .5
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        return (
          <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", gap: 2}}>
            {/* <UpdateUser data={params.row} /> */}
            <ProductInfo product={params.row} />
            <DeleteProduct product={params.row} />
          </Box>
        );
      },
    },
  ];

  console.log(productsData);

  return { productsData, columns };
}
