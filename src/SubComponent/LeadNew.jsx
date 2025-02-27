// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { DataGrid } from '@mui/x-data-grid';
// import { useAllocateLeadMutation, useLazyFetchAllLeadsQuery } from '../Service/Query';
// import { useNavigate } from 'react-router-dom';
// import Header from '../Component/Header';
// import useAuthStore from '../Component/store/authStore';

// const LeadNew = () => {
//   const [leads, setLeads] = useState([]); // Stores lead details
//   const [totalLeads, setTotalLeads] = useState(0); // Stores the total lead count
//   const [page, setPage] = useState(1); // Current page
//   const [selectedLeads, setSelectedLeads] = useState(null); // Stores selected leads
//   const apiUrl = import.meta.env.VITE_API_URL;
//   const [allocateLead, { data: updatedLeads, isSuccess }] = useAllocateLeadMutation();
//   const [paginationModel, setPaginationModel] = useState({
//     page: 0,
//     pageSize: 10,
//   });
//   const {empInfo,activeRole} = useAuthStore()
//   const navigate = useNavigate()
//   const [ fetchLeads, {data: allLeads}   ] = useLazyFetchAllLeadsQuery({page:paginationModel.page+1,limit:paginationModel.pageSize})

//   useEffect(() => {
//     setLeads(allLeads);
//   }, [page]);

  
  
//   const handleAllocate = async () => {
//     // Perform action based on selected leads
//     allocateLead(selectedLeads);
    
//   };

//   const handleCheckboxChange = (id) => {
//     setSelectedLeads(selectedLeads === id ? null : id);
//   }

//   const handlePageChange = (newPaginationModel) => {
//     // setPage(newPaginationModel);
//     // Fetch new data based on the new page
//     setPaginationModel(newPaginationModel)
//     fetchLeads(newPaginationModel); // Adjust this according to your data fetching logic
//   };

//   useEffect(() => {
//     if(isSuccess) navigate("/lead-process")

//   },[isSuccess])

//   useEffect(() => {
//     fetchLeads()
//     setTotalLeads(allLeads?.totalLeads)
//   }, [page, allLeads, updatedLeads])
//   const columns = [
//     {
//       field: 'select',
//       headerName: '',
//       width: 50,
//       renderCell: (params) => (
//         activeRole === "screener" &&
//         <input
//           type="checkbox"
//           checked={selectedLeads === params.row.id}

//           onChange={() => handleCheckboxChange(params.row.id)}
//         />
//       ),
//     },
//     { field: 'name', headerName: 'Full Name', width: 200 },
//     { field: 'mobile', headerName: 'Mobile', width: 150 },
//     { field: 'aadhaar', headerName: 'Aadhaar No.', width: 150 },
//     { field: 'pan', headerName: 'PAN No.', width: 150 },
//     { field: 'city', headerName: 'City', width: 150 },
//     { field: 'state', headerName: 'State', width: 150 },
//     { field: 'loanAmount', headerName: 'Loan Amount', width: 150 },
//     { field: 'salary', headerName: 'Salary', width: 150 },
//     { field: 'source', headerName: 'Source', width: 150 },
//   ];

//   const rows = allLeads?.leads?.map(lead => ({
//     id: lead?._id, // Unique ID for each lead
//     name:` ${lead?.fName}  ${lead?.mName} ${lead?.lName}` ,
//     mobile: lead?.mobile,
//     aadhaar: lead?.aadhaar,
//     pan: lead?.pan,
//     city: lead?.city,
//     state: lead?.state,
//     loanAmount: lead?.loanAmount,
//     salary: lead?.salary,
//     source: lead?.source,
//   }));

//   const downloadCSV = async () => {
//     try {
//       // Fetch first page with a limit of 100
//       const response = await fetchLeads({ page: 1, limit: totalLeads });
  
//       if (response?.data?.leads?.length > 0) {
//         const csvHeader = "Name,Mobile,Aadhaar,PAN,City,State,Loan Amount,Salary,Source\n";
//         const csvRows = response.data.leads.map(lead => 
//           `"${lead?.fName} ${lead?.mName} ${lead?.lName}","${lead?.mobile}","${lead?.aadhaar}","${lead?.pan}","${lead?.city}","${lead?.state}","${lead?.loanAmount}","${lead?.salary}","${lead?.source}"`
//         );
  
//         const csvContent = csvHeader + csvRows.join("\n");
//         const blob = new Blob([csvContent], { type: "text/csv" });
//         const url = URL.createObjectURL(blob);
        
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = "leads.csv";
//         document.body.appendChild(a);
//         a.click();
        
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url);
//       } else {
//         alert("No leads available to download.");
//       }
//     } catch (error) {
//       console.error("Error downloading CSV:", error);
//       alert("Failed to download leads. Please try again.");
//     }
//   };
  
 
  

//   return (
//     <div>
//       {/* Container for Lead counter and action button */}
//       <div
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           marginTop: '70px',
//           marginLeft: '20px',
//         }}
//       >
//         {/* Lead counter */}
//         <div
//           style={{
//             padding: '10px 20px',
//             fontWeight: 'bold',
//             backgroundColor: '#007bff',
//             color: '#fff',
//             borderRadius: '5px',
//             boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
//             cursor: 'pointer',
//           }}
//         >
//           Total Leads: {totalLeads || 0} {/* Defaults to 0 if no leads */}
//         </div>

//         {/* Action button for selected leads */}
//         {activeRole === "screener" &&  
//         <button
//           onClick={handleAllocate}
//           style={{
//             marginLeft: '20px',
//             padding: '10px 20px',
//             backgroundColor: '#28a745',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer',
//           }}  
//         >
//           Allocate
//         </button>  
       
//          }
//          {
//            <button
//            onClick={downloadCSV}
//            style={{
//              marginLeft: '20px',
//              padding: '10px 20px',
//              backgroundColor: '#28a745',
//              color: '#fff',
//              border: 'none',
//              borderRadius: '5px',
//              cursor: 'pointer',
//            }}  
//          >
//            Download New Leads
//          </button> 
//          }
//       </div>

//       <Header />

//       {columns && <div style={{ height: 400, width: '100%',  }}>
//         <DataGrid
//         sx={{color: '#1F2A40',  // Default text color for rows
//           '& .MuiDataGrid-columnHeaders': {
//             backgroundColor: '#1F2A40',  // Optional: Header background color
//             color: 'white'  // White text for the headers
//           },
//           '& .MuiDataGrid-footerContainer': {
//             backgroundColor: '#1F2A40',  // Footer background color
//             color: 'white',  // White text for the footer
//           }}}
//           rows={rows}
//           columns={columns}
//           rowCount={totalLeads}
//           // loading={isLoading}
//           pageSizeOptions={[10]}
//           paginationModel={paginationModel}
//           paginationMode="server"
//           onPaginationModelChange={handlePageChange}
//         />
//       </div>}
//     </div>
//   );
// };

// export default LeadNew;

import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useAllocateLeadMutation, useLazyFetchAllLeadsQuery } from '../Service/Query';
import { useNavigate } from 'react-router-dom';
import Header from '../Component/Header';
import useAuthStore from '../Component/store/authStore';
import Swal from 'sweetalert2';

const LeadNew = () => {
  const [leads, setLeads] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [selectedLeads, setSelectedLeads] = useState(null);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const { empInfo, activeRole } = useAuthStore();
  const navigate = useNavigate();

  const [fetchLeads, { data: allLeads }] = useLazyFetchAllLeadsQuery();
  const [allocateLead, { isSuccess }] = useAllocateLeadMutation();

  useEffect(() => {
    fetchLeads({ page: paginationModel.page + 1, limit: paginationModel.pageSize });
  }, [paginationModel]);

  useEffect(() => {
    if (allLeads) {
      setLeads(allLeads.leads || []);
      setTotalLeads(allLeads.totalLeads || 0);
    }
  }, [allLeads]);

  useEffect(() => {
    if (isSuccess) navigate('/lead-process');
  }, [isSuccess, navigate]);

  const handleAllocate = () => {
    if (selectedLeads) {
      allocateLead(selectedLeads);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedLeads(selectedLeads === id ? null : id);
  };

  const handlePageChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
  };

  // const downloadCSV = async () => {
  //   try {
  //     const response = await fetchLeads({ page: 1, limit: totalLeads }).unwrap();
  //     if (response?.leads?.length) {
  //       const csvHeader = 'Name,Mobile,Aadhaar,PAN,City,State,Loan Amount,Salary,Source\n';
  //       const csvRows = response.leads.map(lead =>
  //         `"${lead.fName} ${lead.mName} ${lead.lName}","${lead.mobile}","${lead.aadhaar}","${lead.pan}","${lead.city}","${lead.state}","${lead.loanAmount}","${lead.salary}","${lead.source}"`
  //       );
        
  //       const csvContent = csvHeader + csvRows.join('\n');
  //       const blob = new Blob([csvContent], { type: 'text/csv' });
  //       const url = URL.createObjectURL(blob);
        
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = 'NewLeads.csv';
  //       document.body.appendChild(a);
  //       a.click();
        
  //       document.body.removeChild(a);
  //       URL.revokeObjectURL(url);
  //     } else {
  //       alert('No leads available to download.');
  //     }
  //   } catch (error) {
  //     console.error('Error downloading CSV:', error);
  //     alert('Failed to download leads. Please try again.');
  //   }
  // };
  const downloadCSV = async () => {
    try {
      Swal.fire({
        title: 'Exporting Leads...',
        text: 'Please wait while we process the data.',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      
      const response = await fetchLeads({ page: 1, limit: totalLeads }).unwrap();
      
      if (response?.leads?.length) {
        const csvHeader = 'Name,Mobile,Aadhaar,PAN,City,State,Loan Amount,Salary,Source\n';
        const csvRows = response.leads.map(lead =>
          `"${lead.fName} ${lead.mName} ${lead.lName}","${lead.mobile}","${lead.aadhaar}","${lead.pan}","${lead.city}","${lead.state}","${lead.loanAmount}","${lead.salary}","${lead.source}"`
        );
        
        const csvContent = csvHeader + csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'leads.csv';
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'No Leads Available',
          text: 'There are no leads to download at the moment.',
        });
      }
    } catch (error) {
      console.error('Error downloading CSV:', error);
      Swal.fire({
        icon: 'error',
        title: 'Export Failed',
        text: 'Failed to download leads. Please try again.',
      });
    } finally {
      Swal.close();
    }
  };


  const columns = [
    {
      field: 'select',
      headerName: '',
      width: 50,
      renderCell: (params) => (
        activeRole === 'screener' && (
          <input
            type="checkbox"
            checked={selectedLeads === params.row.id}
            onChange={() => handleCheckboxChange(params.row.id)}
          />
        )
      ),
    },
    { field: 'name', headerName: 'Full Name', width: 200 },
    { field: 'mobile', headerName: 'Mobile', width: 150 },
    { field: 'aadhaar', headerName: 'Aadhaar No.', width: 150 },
    { field: 'pan', headerName: 'PAN No.', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'loanAmount', headerName: 'Loan Amount', width: 150 },
    { field: 'salary', headerName: 'Salary', width: 150 },
    { field: 'source', headerName: 'Source', width: 150 },
  ];

  const rows = leads.map(lead => ({
    id: lead?._id,
    name: `${lead?.fName} ${lead?.mName} ${lead?.lName}`,
    mobile: lead?.mobile,
    aadhaar: lead?.aadhaar,
    pan: lead?.pan,
    city: lead?.city,
    state: lead?.state,
    loanAmount: lead?.loanAmount,
    salary: lead?.salary,
    source: lead?.source,
  }));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '70px', marginLeft: '20px' }}>
        <div style={{ padding: '10px 20px', fontWeight: 'bold', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}>
          Total Leads: {totalLeads || 0}
        </div>
        {activeRole === 'screener' && <button onClick={handleAllocate} style={{ marginLeft: '20px', padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Allocate</button>}
        <button 
  onClick={downloadCSV} 
  style={{
    marginLeft : '500px',
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background 0.3s ease, transform 0.2s ease',
    boxShadow: '0px 4px 6px rgba(0, 123, 255, 0.2)',
  }}
  onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
  onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
  onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
  onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
>
  Export Leads CSV
</button>

      </div>
      <Header />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          sx={{ color: '#1F2A40', '& .MuiDataGrid-columnHeaders': { backgroundColor: '#1F2A40', color: 'white' }, '& .MuiDataGrid-footerContainer': { backgroundColor: '#1F2A40', color: 'white' } }}
          rows={rows}
          columns={columns}
          rowCount={totalLeads}
          pageSizeOptions={[10]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default LeadNew;
