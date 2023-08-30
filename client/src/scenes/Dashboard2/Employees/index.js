import { Button, Grid, IconButton, Stack } from '@mui/material';
import React, { useState } from 'react';
import AddEmployee from './AddEmployee';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImagePreview from '../common/ImagePreview';
import EmployeeCard from './EmployeeCard';
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from './actions';

const Employees = () => {
  const dispatch = useDispatch()
  const employeesData = useSelector(state => state.employees.employees)

  const [showDialog, setDialog] = useState({ name: "add-employee", show: false })

  const columns = [
    { field: 'id', headerName: 'ID', },
    { field: 'name', headerName: 'Full Name', flex: 1 },
    {
      field: 'photo', headerName: 'Photo', flex: 1,
      renderCell: (params) => (
        <ImagePreview imageUrl={params.row?.photo} linkText={params.row?.proofType}></ImagePreview>
      )
    },
    { field: 'proofType', headerName: 'Proof Type', flex: 1 },
    { field: 'idProof', headerName: 'ID Proof', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'pinCode', headerName: 'Pin code', type: 'number', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
    { field: 'country', headerName: 'Country', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => handleEditEmployee(params.rowIndex)} aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteEmployee(params.rowIndex)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
      flex: 1
    }
  ];

  const [employees, setEmployees] = useState(employeesData);

  const handleEmployeeDataSubmit = (data = {}) => {
    if (data && Object.keys(data).length) {
      setEmployees([...employees, data]);
      dispatch(addEmployee(data))
    }
  }

  const handleDeleteEmployee = (data = {}) => {
    console.log("delete data", data);
  }

  const handleEditEmployee = (data = {}) => {
    console.log("edit data", data);
  }

  return (
    <article>
      <section>
        <Button onClick={() => { setDialog({ ...showDialog, show: true }) }}>+ Add Employee</Button>
        <AddEmployee
          showDialog={showDialog}
          setShowDialog={(value) => { setDialog({ ...showDialog, show: value }) }}
          handleEmployeeDataSubmit={handleEmployeeDataSubmit}
          rowId={employees.length + 1}
        />
      </section>
      <section>
        <Grid container spacing={2}>
          {employees.map((emp, empIndex) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={"emp-" + emp.name}>
              <EmployeeCard labels={columns} index={empIndex} data={emp}></EmployeeCard>
            </Grid>
          ))}

        </Grid>
      </section>
    </article>
  );
};

export default Employees;