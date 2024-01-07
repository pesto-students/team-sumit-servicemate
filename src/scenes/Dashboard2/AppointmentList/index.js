import React, { useEffect, useState } from 'react';
import restClient from '../../../config/axios';
import { useSelector } from 'react-redux';
// import CollapsibleTable from '../../../components/CollapsibleTable';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import clsx from 'clsx';
import TableData from './TableData';
import BookingModal from '../../../components/BookingModal';
const AppointmentList = () => {
  const loggedInUser = useSelector(state => state.user.authUser);
  const [appointments, setAppointments] = useState([]);
  console.log('🚀 ~ file: index.js:8 ~ AppointmentList ~ appointments:', appointments);

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    const apiUrl = '/api/user/fetchAppointments/' + loggedInUser._id + '?v=' + loggedInUser.isVendor;
    const { data } = await restClient(apiUrl);
    if (data?.responseData?.length) {
      setAppointments(data.responseData);
    }
  };

  const columns = [{ name: 'User Name' }, { name: 'Date' }, { name: 'Address' }, { name: 'Payment' }, { name: 'Appointment Status' }, { name: 'Booking Date' }, { name: 'Action' }];
  const rows = appointments.map(({ userName, appointmentDate, userAddress, payment, status, bookingDate }) => ([userName, appointmentDate, Object.values(userAddress).join(', '), payment, status, bookingDate]));

  const updateAppointmentStatus = async (rowIndex) => {
    console.log('🚀 ~ file: index.js:29 ~ updateAppointmentStatus ~ rowIndex:', rowIndex);
    // const { _id } = appointments[rowIndex] || {};
    const apiUrl = '/api/user/updateAppointment/' + loggedInUser._id + '?v=' + loggedInUser.isVendor;
    const { data } = await restClient(apiUrl, { method: 'PUT', data: JSON.stringify(bookAppointmentModal.data) });
    if (data?.responseData) {
      setAppointments(data.responseData);
    }
  };

  const actions = [
    {
      label: 'Accept Appointment',
      handler: (row, rowIndex, e) => {
        console.log('row,rowIndex,e', row, rowIndex, e);
        setBookAppointmentModal({ show: true, data: { ...appointments[rowIndex], status: 'confirmed' }, buttonText: 'Confirm' });
      }
    },
    {
      label: 'Reschedule Appointment',
      handler: (row, rowIndex,) => {
        setBookAppointmentModal({ show: true, data: { ...appointments[rowIndex], status: 'rescheduled' }, buttonText: 'Reschedule' });
      }
    },
    {
      label: 'Cancel Appointment',
      handler: (row, rowIndex,) => {
        setBookAppointmentModal({ show: true, data: { ...appointments[rowIndex], status: 'cancelled' }, buttonText: 'Cancel' });
      }
    },
    {
      label: 'Send Payment Request',
      handler: (row, rowIndex, e) => {
        console.log('row, rowIndex, e', row, rowIndex, e);
      }
    },
    {
      label: 'Generate Invoice',
      handler: (row, rowIndex, e) => {
        console.log('row, rowIndex, e', row, rowIndex, e);
      }
    }
  ];


  const [bookAppointmentModal, setBookAppointmentModal] = useState({ show: false, data: null });

  return (
    <div>
      <TableData columns={columns} rows={rows} actions={actions}></TableData>
      {bookAppointmentModal.show &&
        <BookingModal isOpen={bookAppointmentModal.show} onClose={() => setBookAppointmentModal({ show: false, data: null })} vendor={bookAppointmentModal.data}
          buttonText={bookAppointmentModal.buttonText} handleBookAppointmentModal={updateAppointmentStatus}
        />}
    </div>
  );
};

export default AppointmentList;

//   return (
//     // <!-- Table responsive wrapper -->
//     <div className="overflow-x-auto bg-white dark:bg-neutral-700">

//       {/* <!-- Search input --> */}
//       <div className="relative m-[2px] mb-3 mr-5 float-left">
//         <label htmlFor="inputSearch" className="sr-only">Search </label>
//         <input id="inputSearch" type="text" placeholder="Search..." className="block w-64 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400" />
//         <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4 text-neutral-500 dark:text-neutral-200">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
//           </svg>
//         </span>
//       </div>

//       {/* <!-- Table --> */}
//       <table className="min-w-full text-left text-sm whitespace-nowrap">

//         {/* <!-- Table head --> */}
//         <thead className="uppercase tracking-wider bg-neutral-50 dark:bg-neutral-800">
//           <tr>
//             {columns.map((column, columnIndex) => (
//               <th key={'col-' + columnIndex} scope="col" className="px-6 py-4">
//                 {column.name}
//                 <a href="" className="inline">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 320 512"
//                     className="w-[0.75rem] h-[0.75rem] inline ml-1 text-neutral-500 dark:text-neutral-200 mb-[1px]"
//                     fill="currentColor"
//                   >
//                     {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
//                     <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
//                   </svg>
//                 </a>
//               </th>
//             ))}
//             <th></th>
//           </tr>
//         </thead>

//         {/* <!-- Table body --> */}
//         <tbody>

//           {/* <tr className="hover:bg-neutral-100 dark:hover:bg-neutral-600"> */}
//           {/* <th scope="row" className="px-6 py-4">
//               Handbag
//             </th> */}
//           {rows.map((row, rowIndex) => (
//             <tr className={clsx('hover:bg-neutral-100 dark:hover:bg-neutral-600', { 'bg-neutral-50 dark:bg-neutral-800': rowIndex % 2 })}>
//               {row.map((rowData, rowDataIndex) => (
//                 <td className="px-6 py-4" key={'rowData-' + rowDataIndex}>
//                   {rowData}
//                 </td>
//               ))}
//             </tr>
//           ))}
//           <tr>
//             <td>{<MoreVertIcon></MoreVertIcon>}</td>
//           </tr>
//           {/* <td className="px-6 py-4">30</td>
//             <td className="px-6 py-4">In Stock</td> */}
//           {/* </tr> */}

//           {/* <tr className="hover:bg-neutral-100 dark:hover:bg-neutral-600 bg-neutral-50 dark:bg-neutral-800">
//             <th scope="row" className="px-6 py-4">
//               Shoes
//             </th>
//             <td className="px-6 py-4">$89.50</td>
//             <td className="px-6 py-4">25</td>
//             <td className="px-6 py-4">In Stock</td>
//           </tr>

//           <tr className="hover:bg-neutral-100 dark:hover:bg-neutral-600">
//             <th scope="row" className="px-6 py-4">
//               Bedding Set
//             </th>
//             <td className="px-6 py-4">$69.99</td>
//             <td className="px-6 py-4">40</td>
//             <td className="px-6 py-4">In Stock</td>
//           </tr>

//           <tr className="hover:bg-neutral-100 dark:hover:bg-neutral-600 bg-neutral-50 dark:bg-neutral-800">
//             <th scope="row" className="px-6 py-4">
//               Dining Table
//             </th>
//             <td className="px-6 py-4">$449.99</td>
//             <td className="px-6 py-4">5</td>
//             <td className="px-6 py-4">In Stock</td>
//           </tr>

//           <tr className="hover:bg-neutral-100 dark:hover:bg-neutral-600">
//             <th scope="row" className="px-6 py-4">
//               Soap Set
//             </th>
//             <td className="px-6 py-4">$24.95</td>
//             <td className="px-6 py-4">50</td>
//             <td className="px-6 py-4">In Stock</td>
//             <td style={{ width: '10%' }}>{<MoreVertIcon></MoreVertIcon>}</td>
//           </tr> */}

//         </tbody>

//       </table>

//     </div>
//   );
// };