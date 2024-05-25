import React from "react";
import ProductCard from "./ProductCard";
import Masonry from "react-masonry-css";
import { Box, Container, Typography } from "@mui/material";
import AddProduct from "./AddProduct";
import useAllProducts from "./useAllProducts";
import TableData from "../../../../components/Table/TableData";

export default function ListProductCard() {
  const { productsData, columns } = useAllProducts();

  return (
    <>
      {/* <Typography variant="h4" sx={{ my: 3, fontWeight: "bold" }}>
        Product Backlogs
      </Typography> */}
      <Container>
        <Typography variant="h4" marginBottom={5}>
          Product Backlogs
        </Typography>
        <Box marginBottom={5}>
          <AddProduct />
        </Box>
        <TableData rows={productsData} columns={columns} />
      </Container>
      {/* <Container gap={2} sx={{ mt: 4 }}>
        {productsData?.length == 0 ? (
          <Box
            sx={{
              width: "100%",
              position: "",
            }}
          >
            <AddProduct />
            <Typography
              variant="h2"
              sx={{ position: "absolute", right: "15%", bottom: "35%" }}
            >
              No Product Backlog Found ... !
            </Typography>
          </Box>
        ) : (
          <Masonry
            breakpointCols={4}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            <AddProduct />
            {productsData?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Masonry>
        )}
      </Container> */}
    </>
  );
}
