import React, { useEffect, useMemo, useState } from 'react';
import {DashboardLayout} from '../components/Layout';
import { Button, Toolbar, Typography } from "@material-ui/core";
import Select from 'react-select'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import FilterComponent from './filterDataTest';

const Header = () => {
    return (
      <header className='header'>
        <Typography variant='h4'>
          Input Files
        </Typography>
        <Typography variant='h6'>
          My Inputs
        </Typography>
      </header>
    )
  }

const Main = () => {
    const [selectedRows, setSelectedRows] = useState(false);
    const [toggledClearRows, setToggleClearRows] = useState(false);
    const [data, setData] = useState([])
    const handleChange = ({selectedRows}) => {
        setSelectedRows(selectedRows);
      };
    const handleClearRows = () => {
        setToggleClearRows(!toggledClearRows);
      }
    const userId = 'Great_user@tester.com' //Nome do User_Test quando for implementado os users. Precisa de ser alterado
    const formData = new FormData();
    formData.append('User_id', userId)
    useState(() =>{ axios.post('http://127.0.0.1:5002/Get_my_inputs', formData).then(res => {
      const results = res.data;
      setData(results['my_info'])
    })})
  
    const columns = [
      {
        name: 'File Name',
        selector: row => row.file_name,
        sortable: true
      },
      {
        name: 'File Type',
        selector: row => row.file_type,
        sortable: true
      },
      {
        name: 'Data',
        selector: row => row.data,
        sortable: true
      }
    ]
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    
    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
        if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
        }
    };
    
    return (
        <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        />
    );
  }, [filterText, resetPaginationToggle]);

  const DeleteFiles = () => {
    if (selectedRows == false){
      return alert('No files selected')
    }
    const idToDelete = []
    selectedRows.forEach(element => {
      idToDelete.push(element.id)
    });
    const formDataDelete = new FormData()
    formDataDelete.append('idDelete', JSON.stringify(idToDelete))
    formDataDelete.append('User_id', userId)
    axios.post('http://127.0.0.1:5002/Get_my_inputs/Delete_Files', formDataDelete).then(
      res => {
        const results = res.data
        if (results == 'File deleted sucessful'){
          window.location.reload(false);
        }else{
          return alert('Error Ocurred try again')
        }
      }
    )
  }

  const DownloadFiles = () => {
    if (selectedRows == false){
      return alert('No files selected')
    }
    const idToDownload = []
    selectedRows.forEach(element => {
      idToDownload.push(element.id)
    });
    const formDataDownload = new FormData()
    formDataDownload.append('idDownload', JSON.stringify(idToDownload))
    formDataDownload.append('User_id', userId)
    axios.post('http://127.0.0.1:5002/Get_my_inputs/Download_Files', formDataDownload).then(
      res => {
        const results = res.data
        if (idToDownload.length == 1){
          var blob = new Blob([results])
          var objectURL = URL.createObjectURL(blob)
          window.open(objectURL)
        }else{
          const utf8Encode = new TextEncoder();
          const byteArr = utf8Encode.encode(results);
          var blob = new Blob([byteArr], {type:"application/zip"})
          var objectURL = URL.createObjectURL(blob)
          window.open(objectURL)
        }
        
        
      }
    )
  }



  if (data !== undefined){
  const filteredItems = data.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1);
    return (
        <>
          <Button 
          onClick={handleClearRows}
          variant='contained'
          color='primary'
          style={{ margin: '0.5rem' }}
          >Clear Selected Rows</Button>
          <Button
          onClick={DeleteFiles}
          variant='contained'
          color='secondary'
          style={{ margin: '0.5rem' }}
          >Delete selected files</Button>
          <Button
          onClick={DownloadFiles}
          variant='contained'
          color='secondary'
          style={{ margin: '0.5rem' }}
          >Download Selected Files</Button>
          <DataTable
            style={{ width: "100%", height: "100%" , margin: 'auto'}}
            title= 'My Inputs'
            pagination
            paginationRowsPerPageOptions = {[10,20,30,40,50]}
            noHeader
            striped
            subHeader
            subHeaderComponent={subHeaderComponent}
            columns={columns}
            data={filteredItems}
            selectableRows
            onSelectedRowsChange={handleChange}
            clearSelectedRows={toggledClearRows}
          />
        </>
      )}else{return (
        <>
          <Button 
          onClick={handleClearRows}
          variant='contained'
          color='primary'
          style={{ margin: '0.5rem' }}
          >Clear Selected Rows</Button>
          <Button
          onClick={DeleteFiles}
          variant='contained'
          color='secondary'
          style={{ margin: '0.5rem' }}
          >Delete selected files</Button>
          <Button
          onClick={DownloadFiles}
          variant='contained'
          color='secondary'
          style={{ margin: '0.5rem' }}
          >Download Selected Files</Button>
          <DataTable
            style={{ width: "100%", height: "100%" , margin: 'auto'}}
            title= 'My Inputs'
            pagination
            paginationRowsPerPageOptions = {[10,20,30,40,50]}
            noHeader
            striped
            subHeader
            subHeaderComponent={subHeaderComponent}
            columns={columns}
            data={[]}
            selectableRows
            onSelectedRowsChange={handleChange}
            clearSelectedRows={toggledClearRows}
          />
        </>)};
};







const My_inputs = () => {
    return(
    <DashboardLayout>
      <div className='App'>
        <Header />
        <Main />
      </div>
    </DashboardLayout>
    )
}



export default My_inputs