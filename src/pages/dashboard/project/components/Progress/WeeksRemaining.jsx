import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { ReactTyped } from 'react-typed';

const WeeksRemaining = ({ project }) => {
    const [weeksRemaining, setWeeksRemaining] = useState(0);

    useEffect(() => {
      calculateWeeksRemaining(project.start_date, project.duration);
    }, [project]);

    

    const calculateWeeksRemaining = (startDate, duration) => {
        const currentDate = new Date();
        const projectStartDate = new Date(startDate);
        const projectEndDate = new Date(projectStartDate);
        projectEndDate.setDate(projectStartDate.getDate() + duration * 7);

        const timeDiff = projectEndDate - currentDate;
        const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        const weeksRemaining = Math.max(0, Math.ceil(daysRemaining / 7));

        setWeeksRemaining(weeksRemaining);
    };

  

    return (
        <Typography variant='h4'>
            <ReactTyped
              strings={[`Il reste ${weeksRemaining} semaine(s) pour terminer ce projet.`]}
              typeSpeed={40}
              showCursor={false}
            />
        </Typography>
    );
};

export default WeeksRemaining;
