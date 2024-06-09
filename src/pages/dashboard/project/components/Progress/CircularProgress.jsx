import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import useGetOneProject from "../useGetOneProject";

function CircularProgressWithLabel(props) {
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
          {`${props.value}%`}
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
  const { projectData } = useGetOneProject();

  let done = 0;
  let total = 0;

  projectData?.productBacklogs?.forEach((product) => {
    product?.userStories?.forEach((story) => {
      total += story?.tasks?.length;
      story?.tasks?.forEach((task) => {
        if (task?.state === "Done" && task?.valid == true) done++;
      });
    });
  });

  if (total !== 0) {
    const progress = Math.round((done / total) * 100);
    return <CircularProgressWithLabel project={projectData} value={progress} />;
  }

  return <CircularProgressWithLabel project={projectData} value={0} />;
}



export const calculProgress = () => {
  const { projectData } = useGetOneProject();

  let done = 0;
  let total = 0;

  projectData?.productBacklogs?.forEach((product) => {
    product?.userStories?.forEach((story) => {
      total += story?.tasks?.length;
      story?.tasks?.forEach((task) => {
        if (task?.state === "Done") done++;
      });
    });
  });

  if (total !== 0) {
    const progress = Math.round((done / total) * 100);
    return progress;
  }
  return 0;
};
