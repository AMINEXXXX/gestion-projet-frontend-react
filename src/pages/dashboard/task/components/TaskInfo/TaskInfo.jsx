import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Grid,
  Avatar,
  TextField,
  Card,
  Button,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { useUpdateTask } from "../../../../../hooks/api/useTaskApi";
import FadeMenuEtiquette from "./FadeMenuEtiquette";
import ListEtiquttes from "./ListEtiquttes";
import { AddOutlined, AssignmentOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { grey, teal } from "@mui/material/colors";
import useAllCommentaire from "../commentaire/useAllCommentaire";
import CommentaireCard from "../commentaire/CommentaireCard";
import { useCreateCommentaire } from "../../../../../hooks/api/useCommentaireApi";
import FadeMenuAffecte from "./FadeMenuAffecte";

export default function TaskInfo({ story, task }) {
  const user = useSelector((state) => state.authentication.user);
  const { commentaireData } = useAllCommentaire(task?.id);
  const [isAddingCommentaire, setIsAddingCommentaire] = useState(false);
  const [commentaire, setCommentaire] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(task.name);
  const mutationTask = useUpdateTask();
  const mutationComment = useCreateCommentaire();


  function handleAction(e) {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsEditingName(false);

    const newTask = {
      id: task.id,
      name: newName.charAt(0).toUpperCase() + newName.slice(1),
    };

    mutationTask.mutate(newTask);
  }

  function handleSubmitComment(e) {
    e.preventDefault();
    if (!commentaire.trim()) return;

    setIsAddingCommentaire(false);

    const newCommentaire = {
      text: commentaire.charAt(0).toUpperCase() + commentaire.slice(1),
      date: new Date(),
      task: {
        id: task?.id,
      },
      user: {
        id: user?.id,
      },
    };

    mutationComment.mutate(newCommentaire);
  }

  return (
    <>
      <Avatar
        variant="rounded"
        sx={
          ({ fontWeight: "700", cursor: "pointer", bgcolor: user.id == task?.teamMember?.id ? teal[500] : null })
        }
        onClick={() => setIsDrawerOpen(true)}
      >
        <Typography variant="h5" fontWeight={700}>
          {task.name?.charAt(0).toUpperCase()}
        </Typography>
      </Avatar>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          bgcolor={grey[100]}
          height={
            "1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000%"
          }
        >
          <Box sx={{ width: "700px", p: 1, pl: 2 }}>
            <Box
              width="100%"
              display="flex"
              justifyContent={"space-between"}
              alignItems="center"
            >
              <Box
                height={"50px"}
                display={"flex"}
                gap={1}
                alignItems={"center"}
                width={"100%"}
              >
                <Inventory2OutlinedIcon sx={{ fontSize: 30 }} color="primary" />
                {!isEditingName ? (
                  <Typography
                    variant="h4"
                    pl={1}
                    width="100%"
                    fontSize={"2rem"}
                    onClick={() => setIsEditingName(true)}
                  >
                    {task.name}
                  </Typography>
                ) : (
                  <form onSubmit={handleAction} style={{ width: "100%" }}>
                    <input
                      style={{
                        width: "100%",
                        fontSize: "2rem",
                        fontWeight: 500,
                        padding: 5,
                        outline: "none",
                        border: "3px solid #009688",
                        // border: "3px solid",
                        borderRadius: "5px",
                      }}
                      autoFocus
                      onBlur={handleAction}
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </form>
                )}
              </Box>
              <IconButton
                sx={{ float: "right" }}
                onClick={() => (
                  setIsDrawerOpen(false), setIsEditingName(false)
                )}
              >
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <Typography pl={5.6}>
              Dans la liste de <u>{story?.name}</u>
            </Typography>
          </Box>
          <Grid container px={1}>
            <Grid item xs={9} pl={6.5} pr={1}>
              <Grid container mt={2} gap={1}>
                <Grid item xs={2}>
                  <Typography
                    sx={{ mb: 0.5, fontSize: ".9rem", fontWeight: 700 }}
                  >
                    Affecteé à
                  </Typography>
                  <Box display={"flex"} justifyContent={"center"}>
                    <FadeMenuAffecte task={task} story={story} />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={task?.etiquettes?.length > 3 ? 12 : 9}
                  width={task?.etiquettes?.length > 3 ? "440px" : "380px"}
                >
                  {task?.etiquettes?.length != 0 && (
                    <>
                      <Typography
                        sx={{ mb: 0.5, fontSize: ".9rem", fontWeight: 700 }}
                      >
                        Etiquettes
                      </Typography>
                      <ListEtiquttes
                        task={task}
                        etiquettes={task?.etiquettes}
                        isUpdate={true}
                      />
                    </>
                  )}
                </Grid>
              </Grid>
              <Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  gap={0.5}
                  mt={3}
                  ml={-0.1}
                >
                  <AssignmentOutlined color="primary" sx={{ fontSize: 30 }} />
                  <Typography variant="h6" fontWeight={700}>
                    Activité
                  </Typography>
                </Box>
                <Box
                  mt={1}
                  display={"flex"}
                  alignItems={isAddingCommentaire ? "start" : "center"}
                  gap={1}
                >
                  <Avatar
                    sx={
                      user?.role?.includes("PROJECT_MANAGER") && {
                        bgcolor: teal[500],
                      }
                    }
                  >
                    {user?.fullName?.slice(0, 2)}
                  </Avatar>
                  {!isAddingCommentaire ? (
                    <CommentaireCard
                      setIsAddingCommentaire={setIsAddingCommentaire}
                      text={"Ecrivez un commentaire...."}
                    />
                  ) : (
                    <form style={{ width: "100%" }}>
                      <TextField
                        fullWidth
                        multiline
                        autoFocus
                        minRows={2}
                        placeholder="Ecrivez un commentaire...."
                        size="small"
                        onChange={(e) => setCommentaire(e.target.value)}
                      />
                      <Box
                        sx={{ mt: 1 }}
                        display={"flex"}
                        alignItems={"center"}
                        gap={1}
                      >
                        <Button
                          disabled={!commentaire?.trim()}
                          variant="contained"
                          onClick={handleSubmitComment}
                        >
                          Enregistrer
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => (
                            setCommentaire(""), setIsAddingCommentaire(false)
                          )}
                        >
                          Annuler
                        </Button>
                      </Box>
                    </form>
                  )}
                </Box>
                <Box mb={10}>
                  {commentaireData?.map((comment) => (
                    <CommentaireCard
                      key={comment?.id}
                      comment={comment}
                      user={comment?.user}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3}>
              {user.id == task?.teamMember?.id && <FadeMenuEtiquette task={task} />}
              {user.role.includes("PROJECT_MANAGER") && <FadeMenuAffecte task={task} />}
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
}
