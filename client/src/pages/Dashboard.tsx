// // import * as React from 'react';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const backend_url = import.meta.env.VITE_APP_BACKEND_URL;

// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'firstName', headerName: 'First name', width: 130 },
//   { field: 'lastName', headerName: 'Last name', width: 130 },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 90,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//   },
//   {
//     field: 'phone',
//     headerName: 'Phone',
//     description: 'This column has phone',
//     sortable: false,
//     width: 160,
//     valueGetter: (row)=>`${row.phone}`
//   },
//   {
//     field: 'email',
//     headerName: 'Email',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//   },
//   {
//     field: 'Company',
//     headerName: 'Company',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//   },
//   {
//     field: 'Job Title',
//     headerName: 'Job Title',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//   },
// ];



// // 
// const paginationModel = { page: 0, pageSize: 5 };

// interface contactType{

//   firstName:string; 
//   lastName:string; 
//   phone:string; 
//   email:string; 
//   jobTitle:string; 
//   company:string;

// }



// export default function Dashboard() {

//   const [rows,setRows] = useState<contactType[]>([]);

//   const handleReponse = async()=>{
//     const response = await axios.get(`${backend_url}/api/v1/contact/view`,{
//       headers:{
//         "Authorization":"Bearer "+localStorage.getItem("token"),
//       }
//     }); 

//     const contacts = response.data; 


//     const formattedContacts = contacts.map((contact:any)=>({
//       firstName: contact.firstName,
//     lastName: contact.lastName,
//     phone: contact.phone,
//     email: contact.email,
//     jobTitle: contact.jobTitle,
//     company: contact.company,
//     }))

//       setRows(formattedContacts);
//     console.log(response.data); 



//   }
//   useEffect(()=>{
//     handleReponse();
//   },[])

//   // const rows = [
//   //   //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   //   //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   //   //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   //   //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   //   //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   //   //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   //   //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   //   //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   //   //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   //   // ];
    



//   return (
//     <Paper sx={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{ pagination: { paginationModel } }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//         sx={{ border: 0 }}
//       />
//     </Paper>
//   );
// }



import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetter } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const backend_url = import.meta.env.VITE_APP_BACKEND_URL;

interface ContactType {
  id: string;  // Added id field which is required by DataGrid
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  jobTitle: string;
  company: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'phone', headerName: 'Phone', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'company', headerName: 'Company', width: 160 },
  { field: 'jobTitle', headerName: 'Job Title', width: 160 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetter,row) => 
      `${row.firstName || ''} ${row.lastName || ''}`
  }
];

export default function Dashboard() {
  const [rows, setRows] = useState<ContactType[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const handleResponse = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(`${backend_url}/api/v1/contact/view`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      // console.log(response.data); 
      const contacts:[] = response.data.contacts;
      const formattedContacts = contacts.map((contact: any) => ({
        id: contact.id, // Adding required id field
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
        email: contact.email,
        jobTitle: contact.jobTitle,
        company: contact.company,
      }));

      console.log(formattedContacts); 

      setRows(formattedContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    handleResponse();
  }, []);

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}