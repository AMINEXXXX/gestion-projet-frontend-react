import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

function CircularProgressWithLabel(props) {
  console.log(props.project);

  let total = 0;
  let completed = 0;
  props.project?.productBacklogs?.map((product) =>
    product?.userStories?.map((story) => {
      total += story?.tasks?.length;
      story?.tasks?.map((task) => {
        if (task?.state == "Done") completed += 1;
      });
    })
  );
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        size={300}
        sx={{ fontSize: "2100px" }}
        variant="determinate"
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{ fontSize: 90 }}
        >
          {`${Math.round((completed/total)*100)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel() {
  const { project } = useSelector((state) => state.project);
  const progress = project?.productBacklogs?.length;

  if (project?.productBacklogs?.user_story?.task)
    return <CircularProgressWithLabel project={project} value={progress} />;
  else return <CircularProgressWithLabel project={project} value={0} />;
}
