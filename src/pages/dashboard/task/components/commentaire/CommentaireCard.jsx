import { Avatar, Box, Card, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { formatDistanceToNow, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import React from "react";

export default function CommentaireCard({
  setIsAddingCommentaire,
  comment,
  text = null,
  user = null,
}) {
  function formatTimeSent(dateString) {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: fr,
      includeSeconds: true,
    });
  }

  return (
    <Box width={"100%"} display={"flex"} alignItems={"start"} gap={1} my={1}>
      {user != null && (
        <Box>
          <Avatar
            sx={user?.role == "PROJECT_MANAGER" && { bgcolor: teal[500] }}
          >
            {user?.fullName?.slice(0, 2)}
          </Avatar>
        </Box>
      )}
      <Box width={"100%"}>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
          <Typography
            variant="h6"
            fontWeight={700}
            color={"#444"}
            display={"flex"}
            alignItems={"end"}
          >
            {user?.fullName}
            {user?.role == "PROJECT_MANAGER" && (
              <Typography fontSize={12} pb={0.7}>
                &nbsp;&nbsp;(Chef)
              </Typography>
            )}
          </Typography>
          <Typography variant="p" pr={2}>
            {text == null && formatTimeSent(comment?.date)}
          </Typography>
        </Box>
        <Card
          sx={[
            {
              width: "410px",
              borderRadius: 3,
              cursor: user == null ? "pointer" : "",
              p: 1,
            },
            user == null && { "&:hover": { bgcolor: "#eee" } },
          ]}
          onClick={() => setIsAddingCommentaire(true)}
        >
          {text == null ? (
            <Typography>{comment?.text}</Typography>
          ) : (
            <Typography>{text}</Typography>
          )}
        </Card>
      </Box>
    </Box>
  );
}
