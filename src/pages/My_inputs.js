import React, { useMemo, useState } from 'react';
import {DashboardLayout} from '../components/Layout';
import { Button, Toolbar, Typography } from "@material-ui/core";
import Select from 'react-select'
import axios from 'axios'
import DataTable from 'react-data-table-component'

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
    const handleChange = ({selectedRows}) => {
        setSelectedRows(selectedRows);
      };
    const handleClearRows = () => {
        setToggleClearRows(!toggledClearRows);
      }
    const userId = 'Great_user@tester.com' //Nome do User_Test quando for implementado os users. Precisa de ser alterado
    const formData = new FormData();
    formData.append('User_id', userId)
    const response = axios.post('http://127.0.0.1:5002/Get_my_inputs', formData)
    const data = response.data //Falta tranformar a data obtida do backend em Dados para inserir na tabel. Nao esquecer de usar o ID para fazer remoçoes na BD
    const columns = [
      {
        name: 'File Name',
        selector: row => row.file_Name,
        sortable: true
      },
      {
        name: 'File Type',
        selector: row => row.file_type,
        sortable: true
      }
    ]



    return (
        <>
          <button onClick={handleClearRows}>
            Clear Selected Rows
          </button>
          <DataTable
            style={{ width: "100%", height: "100%" , margin: 'auto'}}
            title= 'My Inputs'
            pagination
            paginationRowsPerPageOptions = {[10,20,30,40,50]}
            columns={columns}
            data={data}
            selectableRows
            onSelectedRowsChange={handleChange}
            clearSelectedRows={toggledClearRows}
          />
        </>
      );
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