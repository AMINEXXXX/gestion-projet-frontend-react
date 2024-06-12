import React from "react";
import { useParams } from "react-router-dom";
import AddProduct from "./AddProduct";
import ListProductCard from "./ListProductCard";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function ProductBacklog() {
  const user = useSelector((state) => state.authentication.user);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" ml={5}>
          Product Backlogs
        </Typography>
        {user.role.includes("PROJECT_MANAGER") && (
          <Box my={5} mr={2}>
            <AddProduct />
          </Box>
        )}
      </Box>
      <Box sx={{ mt : !user.role.includes("PROJECT_MANAGER") ? 10 : 0}}>
        <ListProductCard />
      </Box>
    </>
  );
}
