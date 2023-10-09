import { Button, Grid, } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddEmployee from './AddEmployee';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ImagePreview from '../common/ImagePreview';
// import EmployeeCard from './EmployeeCard';
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from './actions';
// import { SfButton } from '@storefront-ui/react';
// import SearchInput from '../../../components/SearchInput';
import DynamicSearch from './DyanmicSearch';
import restClient from '../../../config/axios';
import FreelancerCard from './FreelancerCard';

const Employees = () => {
  const dispatch = useDispatch()
  const employeesData = useSelector(state => state.employees.employees)
  const loggedInUser = useSelector(state => state.user.authUser)
  const [showDialog, setDialog] = useState({ name: "add-employee", show: false })

  // const columns = [
  //   { field: 'id', headerName: 'ID', },
  //   { field: 'name', headerName: 'Full Name', flex: 1 },
  //   {
  //     field: 'photo', headerName: 'Photo', flex: 1,
  //     renderCell: (params) => (
  //       <ImagePreview imageUrl={params.row?.photo} linkText={params.row?.proofType}></ImagePreview>
  //     )
  //   },
  //   { field: 'proofType', headerName: 'Proof Type', flex: 1 },
  //   { field: 'idProof', headerName: 'ID Proof', flex: 1 },
  //   { field: 'address', headerName: 'Address', flex: 1 },
  //   { field: 'city', headerName: 'City', flex: 1 },
  //   { field: 'pinCode', headerName: 'Pin code', type: 'number', flex: 1 },
  //   { field: 'state', headerName: 'State', flex: 1 },
  //   { field: 'country', headerName: 'Country', flex: 1 },
  //   {
  //     field: 'actions',
  //     headerName: 'Actions',
  //     sortable: false,
  //     renderCell: (params) => (
  //       <Stack direction="row" spacing={1}>
  //         <IconButton onClick={() => handleEditEmployee(params.rowIndex)} aria-label="edit">
  //           <EditIcon />
  //         </IconButton>
  //         <IconButton onClick={() => handleDeleteEmployee(params.rowIndex)} aria-label="delete">
  //           <DeleteIcon />
  //         </IconButton>
  //       </Stack>
  //     ),
  //     flex: 1
  //   }
  // ];

  const [employees, setEmployees] = useState(employeesData);

  const handleEmployeeDataSubmit = (data = {}) => {
    if (data && Object.keys(data).length) {
      setEmployees([...employees, data]);
      dispatch(addEmployee(data))
    }
  }

  // const handleDeleteEmployee = (data = {}) => {
  //   console.log("delete data", data);
  // }

  // const handleEditEmployee = (data = {}) => {
  //   console.log("edit data", data);
  // }

  const handleAddFreelancer = async () => {
    const apiUrl = '/api/vendor/updateFreelancer/' + loggedInUser._id
    const payload = {
      freelancerId: selectedValue?._id
    }
    const { data } = await restClient(apiUrl, { method: "PUT", data: payload })
    if (data?.responseData) {
      getMyFreelancers()
    }
  }

  const [freelancers, setFreelancers] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null)

  const handleFreelancerSearch = async (query) => {
    if (!query) {
      return
    }
    const apiUrl = '/api/vendor/searchFreelancer?search=' + query
    const { data } = await restClient(apiUrl)
    if (data?.responseData) {
      setFreelancers(data.responseData)
    }
  }

  useEffect(() => {
    getMyFreelancers()
  }, [])

  const [myFreelancers, setMyFreelancers] = useState([]);

  const getMyFreelancers = async () => {
    const apiUrl = '/api/vendor/freelancers/' + loggedInUser._id
    const { data } = await restClient(apiUrl)
    if (data?.responseData) {
      setMyFreelancers(data.responseData)
    }
  }

  return (
    <Grid container alignItems="center">
      <Grid item sm={4}>
        <DynamicSearch selectedValue={selectedValue} setSelectedValue={setSelectedValue} handleSearch={handleFreelancerSearch} data={freelancers} optionLabel='serviceProviderName'></DynamicSearch>
      </Grid>
      <Grid item>
        <Button onClick={() => { handleAddFreelancer() }}>+ Add Employee</Button>
      </Grid>
      <AddEmployee
        showDialog={showDialog}
        setShowDialog={(value) => { setDialog({ ...showDialog, show: value }) }}
        handleEmployeeDataSubmit={handleEmployeeDataSubmit}
        rowId={freelancers.length + 1}
      />
      <Grid container className='pt-4' spacing={2}>
        {myFreelancers?.map((freelancer, freelancerIndex) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={"freelancer-" + freelancer.name + "-" + freelancerIndex}>
            <FreelancerCard freelancer={freelancer} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Employees;

