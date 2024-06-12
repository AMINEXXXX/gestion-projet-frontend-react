import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DeleteStory from "../MoreOption/DeleteStory";
import StoryInfo from "../StoryInfo/StoryInfo";
import { useUpdateUserStory } from "../../../../../hooks/api/useUserStoryApi";
import ListEtiquttes from "../StoryInfo/ListEtiquttes";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function userStorySubCard({ product, story }) {
  const user = useSelector((state) => state.authentication.user);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newName, setNewName] = useState(story.name);
  const [newDescription, setNewDescription] = useState(story.description);
  const mutation = useUpdateUserStory();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function HandleSubmitOrBlurName(e) {
    if (!newName.trim()) return;

    setIsEditingName(false);

    const newStory = {
      id: story.id,
      name: newName,
    };

    mutation.mutate(newStory);
  }

  function HandleSubmitOrBlurDescription(e) {
    if (!newDescription.trim()) return;

    setIsEditingDescription(false);

    const newStory = {
      id: story.id,
      description: newDescription,
    };

    mutation.mutate(newStory);
  }

  return (
    <Card
      draggable={user.role.includes("PROJECT_MANAGER") ? true : false}
      onDragStart={(e) => e.dataTransfer.setData("id", story.id)}
      sx={{
        width: "100%",
        marginTop: -3,
        borderRadius: 4,
        "&:hover": { bgcolor: "#eee" },
        borderRadius: 1,
      }}
    >
      <CardHeader
        // sx={{ "&:hover": { bgcolor: "#eee" }, borderRadius: 1 }}
        avatar={<StoryInfo product={product} story={story} />}
        action={
          user.role.includes("PROJECT_MANAGER") && <DeleteStory story={story} />
        }
        title={
          !isEditingName ? (
            <>
              <ListEtiquttes etiquettes={story?.etiquettes} />
              <Typography
                noWrap
                onClick={() =>
                  user.role.includes("PROJECT_MANAGER")
                    ? setIsEditingName(true)
                    : null
                }
                sx={{
                  fontSize: 19,
                  width: "100%",
                  cursor: user.role.includes("PROJECT_MANAGER")
                    ? "pointer"
                    : "",
                }}
              >
                {story?.name?.charAt(0).toUpperCase() + story?.name?.slice(1)}
              </Typography>
            </>
          ) : (
            <form onSubmit={(e) => HandleSubmitOrBlurName(e)}>
              <input
                autoFocus
                onBlur={(e) => HandleSubmitOrBlurName(e)}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                style={{
                  fontSize: 19.5,
                  width: "100%",
                  border: "3px solid #009688",
                  outline: "none",
                  borderRadius: 5,
                  cursor: "pointer",
                  padding: "6px 3.4px",
                  margin: ".5px -5px",
                }}
              />
            </form>
          )
        }
      />
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {!isEditingDescription ? (
            <Typography
              onClick={() => setIsEditingDescription(true)}
              variant="body1"
              color="inherit"
            >
              {story?.description}
            </Typography>
          ) : (
            <form onSubmit={(e) => HandleSubmitOrBlurDescription(e)}>
              <TextField
                multiline
                autoFocus
                onBlur={(e) => HandleSubmitOrBlurDescription(e)}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                style={{
                  fontSize: 19.5,
                  width: "100%",
                  backgroundColor: "#FFF",
                  borderRadius: 5,
                  cursor: "pointer",
                }}
              />
            </form>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}
