import React from "react";
import { useSelector } from "react-redux";
import { useGetProductBacklogById } from "../../../../hooks/api/useProductBacklogApi";
import DeleteProduct from "./DeleteProduct";
import { Box } from "@mui/material";
import ProductInfo from "./ProductInfo/ProductInfo";

function createData(id, name, description, userStories, etiquettes) {
  return { id, name, description, userStories, etiquettes };
}

export default function useAllProducts() {
  const { project } = useSelector((state) => state.project);
  const user = useSelector((state) => state.authentication.user);
  const { data } = useGetProductBacklogById(project.id);

  const productsData = data?.map((e) =>
    createData(e.id, e.name, e.description, e.userStories, e.etiquettes)
  );

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3.5,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <ProductInfo product={params.row} />
            {user.role.includes("PROJECT_MANAGER") && (
              <DeleteProduct product={params.row} />
            )}
          </Box>
        );
      },
    },
  ];

  return { productsData, columns };
}
