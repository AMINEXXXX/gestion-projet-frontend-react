import React from 'react';
import { useGetAllProject } from "../../../../hooks/api/useProjectApi";
import DeleteProject from './DeleteProject';
import UpdateProject from "./UpdateProject";

const createData = (id, name, description, start_date, duration, price) => {
  return { id, name, description, start_date, duration, price };
};

export default function useAllProject() {
  const allProjects = useGetAllProject();
  const projectData = allProjects?.data?.map( (e) => 
    createData(
      e.id,
      e.name,
      e.description,
      e.start_date,
      e.duration,
      e.price + " DH"
    )
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: "name", headerName: "Name", width:70},
    { field: "description", headerName: "Description", flex: 2},
    { field: "start_date", headerName: "Start Date", width:70},
    { field: "duration", headerName: "Duration", width:70},
    { field: "price", headerName: "Price", width:70},
    {
      field: "action",
      headerName: "",
      width: 180,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <UpdateProject data={params.row} />
            <DeleteProject data={params.row} />
          </>
        );
      },
    }
  ]


  return { projectData, columns };
  // return useGetAllProject().data;
}
