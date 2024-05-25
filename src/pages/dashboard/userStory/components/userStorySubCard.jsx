import { Avatar, Box, Card, CardHeader, Typography } from "@mui/material";
import React, { useState } from "react";
import FadeMenu from "./MoreOption/FadeMenu";

export default function userStorySubCard({ story }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState("");

  return (
    <Card sx={{width: "250px", marginTop: -3}}>
      <CardHeader
        // avatar={
        //   <Avatar variant="rounded" sx={{ fontWeight: "700" }}>
        //     {story.name?.charAt(0).toUpperCase()}
        //   </Avatar>
        // }
        action={
          <Box
            sx={{
              margin: -1.1,
            }}
          >
            <FadeMenu story={story} />
          </Box>
        }
        title={
          !isEditingName ? (
            <Typography
              noWrap
              onClick={() => setIsEditingName(true)}
              sx={{ fontSize: 19, cursor: "pointer", width: "100%" }}
            >
              {story?.name?.charAt(0).toUpperCase() + story?.name?.slice(1)}
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
    </Card>
  );
}
