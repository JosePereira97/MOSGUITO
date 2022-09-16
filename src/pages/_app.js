import React, {useEffect, useState} from "react";

import Routes from "./_routes";
import * as defaultValues from '../utils/defaultValues.json';
import Loggin from "./Loggin";

export const App = () => {
  const [configData, setConfig] = useState(defaultValues.default)
  const [outputsFiles, setOutputsFiles] = useState({})
  const [hasMt, setHasMt] = useState(true)
  const toggleHasMt = () => setHasMt(!hasMt)
  const [hasMp, setHasMp] = useState(false)
  const toggleHasMp = () => setHasMp(!hasMp)
  const [experimentsFiles, setExperimentsFiles] = useState([[]])
  const [loadingApp, setLoadingApp] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  
  

  const onConfigChange = (field, value) => {
    const newValue = { ...configData, [field]: value }
    setConfig(newValue)
  }

  const onConfigOverwrite = (newConfigData) => {
    const newValue = newConfigData
    setConfig(newValue)
  }
  if(loggedIn === true){
  return <Routes
    configData={configData}
    onConfigChange={onConfigChange}
    onConfigOverwrite={onConfigOverwrite}
    outputsFiles={outputsFiles}
    setOutputsFiles={setOutputsFiles}
    hasMt={hasMt}
    toggleHasMt={toggleHasMt}
    hasMp={hasMp}
    toggleHasMp={toggleHasMp}
    experimentsFiles={experimentsFiles}
    setExperimentsFiles={setExperimentsFiles}
  />;}else{
    return(<Loggin loadingApp ={loadingApp} setLoadingApp = {setLoadingApp} loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} ></Loggin>)
  }
};

