import Modal from "../../../../components/Modal/Modal";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PropTypes from "prop-types";


export default function UpdateArticle({ data }) {
  //   const queryClient = useQueryClient();

  //   const mutation = useMutation({
  //     mutationFn: deleteUser,
  //     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  //   });

  return (
    <>
      <Modal
        btnIcon={<EditRoundedIcon />}
        modalTitle={"Update l'article "}
        modalActionName={"Update"}
        // modalActionEvent={() => {
        //   mutation.mutate(data.id);
        // }}
      >
        {/* <CreateUpdateForm data={data} isUpdate={true} /> */}
        Update Article
      </Modal>
    </>
  );
}

UpdateArticle.propTypes = {
  data: PropTypes.object,
};
