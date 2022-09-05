import React, { useMemo, useState } from 'react';
import {DashboardLayout} from '../components/Layout';
import { Button, Toolbar, Typography } from "@material-ui/core";
import Select from 'react-select'
import axios from 'axios'

const Header = () => {
    return (
      <header className='header'>
        <Typography variant='h4'>
          Input Files
        </Typography>
        <Typography variant='h6'>
          Upload your files
        </Typography>
      </header>
    )
  }

const Main = () => {
    const userId = 'Great_user@tester.com' //Nome do User_Test quando for implementado os users. Precisa de ser alterado
    const [type, setType] = useState("")
    const different_types = [{value:'Contigs', label:'Contigs'},{value:'Entry_report', label:'Entry_report'}, {value:'fastq', label:'fastq'}, {value:'scaffolds', label:'scaffolds'},{value:'fgs', label:'fgs'}]
    const changeType = (e) => {
        console.log(e)
        setType(e)
    }
    const [file, setFile] = useState([])
    const handleFile = (e) =>{
        console.log(e)
        setFile(e)
        console.log(file)
    }
    const sendFiles = () => {
        const formData = new FormData();
        formData.append('el_file', file[0])
        formData.append('type', type.value)
        formData.append('userId', userId)
      axios.post('http://127.0.0.1:5002/Submit_input_file', formData) //TODO request tem de ser na API, n na base de dados diretamente
      }



    return (
    <>
      <input
          type="file"
          onChange={(ev) => {handleFile(ev.target.files)}}
      />
      <Select options={different_types} value={type} onChange={changeType}/>
      <Button
        onClick={() => sendFiles()}
        variant='contained'
        color='secondary'
        component="label"
      >
        Upload File
      </Button>
    </>
  )
  }






const Upload_inputs = () => {
    return(
        <DashboardLayout>
      <div className='App'>
        <Header />
        <Main />
      </div>
    </DashboardLayout>
    )
}



export default Upload_inputs