import React, { useMemo, useState } from 'react';
import {DashboardLayout} from '../components/Layout';
import { Button, Toolbar, Typography } from "@material-ui/core";
import Select from 'react-select'
import axios from 'axios'
import Accordion from '../components/Accordion'
import LabelledCheckbox from "../components/LabelledCheckbox"

const Header = () => {
  return (
    <header className='header'>
      <Typography variant='h4'>
        Start my Analyses
      </Typography>
      <Typography variant='h6'>
        Go to Configuration to config analyses
      </Typography>
    </header>
  )
}

const Main = (configData, onConfigChange) => {
  const analyses = ['preprocess', 'join_reads', 'assembly', 'binning', 'fastq2fasta', 'annotation', 'recognizer', 'quantification_analysis', 'metaphlan', 'protein_report','entry_report','differential_expression', 'keggcharter']
  const [analyses_delta, setAnalyses] = useState([])
  let index = 0
  const handleCheck = value =>{
    const newList = [...analyses_delta]
    const index_handle = newList.indexOf(value)
    if (index_handle > -1) {
      newList.splice(index_handle, 1)
    } else {
      newList.push(value)
    }
    setAnalyses(newList)
  }


  return(<div style={{margin:'0.5rem'}}>
      <Accordion  title='Choose yout Analyses'>
        {analyses.map(name =>{
          let isDisabled = true;
          const whatchCheckMinus = analyses_delta.indexOf(analyses[analyses.indexOf(name) - 1])
          const whatchCheckMax = analyses_delta.indexOf(analyses[analyses.indexOf(name) + 1])
          if(whatchCheckMinus > -1 || analyses_delta.length === 0 || whatchCheckMax > -1 || analyses_delta.includes(name)){
            isDisabled = false
          }
          index = index + 1
          return(<LabelledCheckbox
          key={index}
          label={name}
          checked={analyses_delta.indexOf(name) > -1}
          setChecked={() => handleCheck(name)}
          isDisable = {isDisabled}
        />)
        })}
      </Accordion>
      <Typography  colorPrimary='white' variant='h6'>Go to Configuration and write in the experiments file the Sample, type, condition, name</Typography>
      <Accordion title='Match Input Files with Experiments Table'>
        
      </Accordion>
  </div>)
}





const ServerAnalyses = (configData, onConfigChange) => {
    return(
        <DashboardLayout>
      <div className='App'>
        <Header />
        <Main
        configData
        onConfigChange 
        />
      </div>
    </DashboardLayout>
    )
}



export default ServerAnalyses