import { Box, Container, Typography } from '@mui/material';
import React from 'react'
import AddTask from './AddTask';
import ListTasks from './ListTasks';

export default function Task() {
  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" mb={5}>
          Tasks
        </Typography>
        <Box mt={5}>
          <AddTask />
        </Box>
      </Box>
      <ListTasks />
    </Container>
  );
}
