import React from "react";
import { useParams } from "react-router-dom";
import AddProduct from "./AddProduct";
import ListProductCard from "./ListProductCard";
import { Box } from "@mui/material";

export default function ProductBacklog() {
  return (
    <>
      <ListProductCard />
    </>
  );
}
