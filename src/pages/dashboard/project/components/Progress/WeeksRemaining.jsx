import React, { useState, useEffect } from 'react';

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
        <div>
            <h2>Il reste {weeksRemaining} semaine(s) pour terminer ce projet.</h2>
        </div>
    );
};

export default WeeksRemaining;
