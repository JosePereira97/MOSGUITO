import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/Layout';
import { Button, Toolbar, Typography } from "@material-ui/core";
import ReactHtmlParser from 'react-html-parser';
import * as zip from "@zip.js/zip.js/dist/zip.min.js";
import $ from 'jquery'
import * as Papa from "papaparse"

const treatName = (name) =>{
  let resultingString = name.split('/')
  resultingString = resultingString[resultingString.length-1]
  resultingString = resultingString.split('.')
  return(resultingString[0])
}

export let ResultsDisposition = false;
async function ObtainBlobArray(event){
  const file = event.target.files[0];
  const blobReader = new zip.BlobReader(file);
  const zipReader = new zip.ZipReader (blobReader);
  const entries = await zipReader.getEntries();
  let FastQCReports = [];
  let KronaPlotsResults = [];
  let DifferentailExpressionResults = [];
  let KEGGMapsResults = [];
  let Assembly = [];
  let entry = [];
  let configFile = [];
  let exper = [];

  for(let i = 0; i< entries.length; i++){
    if (entries[i].directory === false && entries[i].compressedSize != 0){
      if(entries[i].filename.includes('Preprocess')){
        const blobFastQC = await entries[i].getData(new zip.BlobWriter(['text/html']))
        let fastQcName = treatName(entries[i].filename)
        FastQCReports.push({name: fastQcName, blob: blobFastQC})
      }
    if(entries[i].filename.includes('Annotation')){
      const blobKronaPlots = await entries[i].getData(new zip.BlobWriter(['text/html']))
      let kronaPlotsNames = treatName(entries[i].filename)
      KronaPlotsResults.push({name: kronaPlotsNames, blob: blobKronaPlots})
    }
    if(entries[i].filename.includes('Differential expression analysis')){
      const blobHeatmaps = await entries[i].getData(new zip.BlobWriter(['image/jpeg']))
      let heatMapsNames = treatName(entries[i].filename)
      DifferentailExpressionResults.push({name: heatMapsNames, blob:blobHeatmaps})

    }
    if(entries[i].filename.includes('KEGGMaps')){
      const blobKEGGMaps = await entries[i].getData(new zip.BlobWriter(['image/png']))
      KEGGMapsResults.push(blobKEGGMaps)

    }
    if(entries[i].filename.includes('Assembly')){
      const AssemblyReports = await entries[i].getData(new zip.BlobWriter(['text/tab-separated-values']))
      let assemblyName = treatName(entries[i].filename)
      Assembly.push({name: assemblyName, blob: AssemblyReports})
    }
    if(entries[i].filename.includes('Entry')){
      const entryReport = await entries[i].getData(new zip.BlobWriter(['text/tab-separated-values']))
      let entryName = treatName(entries[i].filename)
      entry.push({name: entryName, blob: entryReport})
    }
    if(entries[i].filename.includes('config')){
      const config = await entries[i].getData(new zip.BlobWriter(['	application/json']))
      const fileUrl = URL.createObjectURL(config)
      $.getJSON(fileUrl, function(json){
        configFile = json
      })
    }
    if(entries[i].filename.includes('experiments')){
      const exp = await entries[i].getData(new zip.BlobWriter(['text/tab-separated-values']))
      exper = exp
    }}
  }
  await zipReader.close()
  return [{
    qcReports: FastQCReports,
    KronaPlots: KronaPlotsResults,
    Heatmaps: DifferentailExpressionResults,
    KEGGMaps: KEGGMapsResults,
    asReports: Assembly,
    entryReport: entry
  }, configFile, exper]
}


const Main = ({ outputsFiles, setOutputsFiles, onConfigChange, setExperiments, setExperimentsRows }) => {

  

  const handleUploadClick = () => {
    ResultsDisposition = true
  }
  const handleZipChange = async (event) => {
    let Output = await ObtainBlobArray(event)
    setOutputsFiles(Output[0])
    for(const[key, value] of  Object.entries(Output[1])){
      onConfigChange(key, value)
    }
    const readCsv = (csvUrl)=>{
      Papa.parse(csvUrl,{
        download: true,
        header: true,
        complete: function (results) {
            results.data.pop()
            let badjoras = results.data
            setExperiments(badjoras);
            setExperimentsRows(Object.keys(badjoras).length)
        }
    })
    }
    let csvUrl = URL.createObjectURL(Output[2])
    readCsv(csvUrl)
  }
  return (
    <>
      <Button
        variant='contained'
        color='secondary'
        component="label"
        onClick={handleUploadClick}
      >
        Upload results folder
          <input
          type="file"
          accept='application/zip'
          onChange={handleZipChange}
          hidden
        />
      </Button>


      <>{ReactHtmlParser()}</>

    </>
  )
};

export const LoadResults = ({ outputsFiles, setOutputsFiles, onConfigChange, setExperiments, setExperimentsRows }) => {
  return (
    <DashboardLayout>
      <Toolbar>
        <Typography variant="h6">MOSCA results page</Typography>
      </Toolbar>
      <Main
        outputsFiles={outputsFiles}
        setOutputsFiles={setOutputsFiles}
        onConfigChange = {onConfigChange}
        setExperiments = {setExperiments}
        setExperimentsRows = {setExperimentsRows}
      />
    </DashboardLayout>

  )
}

