import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import DeleteProduct from "./DeleteProduct";

export default function ProductCard({ product }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const HandleSubmitOrBlur = (e) => {
    e.preventDefault();
    setIsEditingName(false);
    const newProduct = {
      id: product.id,
      name: newName.charAt(0).toUpperCase() + newName.slice(1),
      description: newDescription,
    };
    console.log(newProduct.name);
    update.mutate(newProduct);
  };

  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar variant="rounded" sx={{ fontWeight: "700" }}>
              {product.name?.charAt(0)}
            </Avatar>
          }
          action={
            <Box
              sx={{
                margin: -1.0,
              }}
            >
              <DeleteProduct product={product} />
            </Box>
          }
          title={
            !isEditingName ? (
              <Typography
                noWrap
                onClick={() => setIsEditingName(true)}
                sx={{ fontSize: 19, cursor: "pointer", width: "100%" }}
              >
                {product?.name?.charAt(0).toUpperCase() +
                  product?.name?.slice(1)}
              </Typography>
            ) : (
              <form onSubmit={(e) => HandleSubmitOrBlur(e)}>
                <input
                  autoFocus
                  onBlur={(e) => HandleSubmitOrBlur(e)}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{
                    fontSize: 19.5,
                    width: "100%",
                    borderRadius: 5,
                    cursor: "pointer",
                    padding: "8px 5px",
                    margin: ".5px -5px",
                  }}
                />
              </form>
            )
          }
        />
        <CardContent>
          {!isEditingDescription ? (
            <Typography onClick={() => setIsEditingDescription(true)} variant="body2" color="textSecondary" sx={{cursor: "pointer"}}>
              {product.description}
            </Typography>
          ) : (
            ""
          )}
        </CardContent>
      </Card>
    </>
  );
}
