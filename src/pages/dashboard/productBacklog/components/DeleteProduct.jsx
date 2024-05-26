import { Typography } from "@mui/material";
import Modal from "../../../../components/Modal/Modal";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PropTypes from "prop-types";
import { useDeleteProductBacklog } from "../../../../hooks/api/useProductBacklogApi";

export default function DeleteProduct({ product }) {
  const mutation = useDeleteProductBacklog();

  return (
    <>
      <Modal
        btnIcon={<DeleteOutlinedIcon />}
        btnColor={"error"}
        modalTitle={"Supprimer le product backlog "}
        modalActionName={"Supprimer"}
        btnActionColor={"error"}
        modalActionEvent={() => {
          mutation.mutate(product.id);
        }}
      >
        <Typography variant="p" component="p" sx={{ my: 2 }}>
          souhaitez-vous supprimer le product backlog «{product?.name?.charAt(0)?.toUpperCase() + product?.name?.slice(1)} »
        </Typography>
      </Modal>
    </>
  );
}

DeleteProduct.propTypes = {
  data: PropTypes.object,
};
