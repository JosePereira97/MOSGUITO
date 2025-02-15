import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ProjectPage from "./project";
import MembersPage from "./members";
import AboutPage from "./about";
import TeamsPage from "./teams";
import HomePage from "./home";
import Config from "./config";
import Experiments from "./experiments";
import UniprotColumns from "./uniprotColumns";
import UniprotDatabases from "./uniprotDatabases";
import KeggMaps from "./keggmaps";
import { LoadResults } from "./results";
import { FastQCFiles } from "./fastQCReports";
import AssemblyQC from "./assemblyQC";
import { AnnotationResults } from "./annotation";
import { DifferentialResults } from "./differentialExpressionResults";
import { KeggmapsResults } from "./keggmapsResults";
import EntryReports from "./entryReport";
import GeneralReports from "./generalReports";
import ProteinReports from "./proteinReports";
import Upload_inputs from "./Upload_inputs";
import My_inputs from "./My_inputs";
import ServerAnalyses from "./start_Server_Analyses";
import Loggin from "./Loggin";
import { Redirect, useHistory } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import LogOut from "../components/logOutComponent";

const Routes = ({
  configData,
  onConfigChange,
  onConfigOverwrite,
  hasMt,
  toggleHasMt,
  hasMp,
  toggleHasMp,
  outputsFiles,
  setOutputsFiles,
  experimentsFiles,
  setExperimentsFiles,
}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [test, setTest] = useState("Loading");

  useEffect(() => {
    setTest("Loading");
    let request = axios.post(
      "http://127.0.0.1:5000/Login/Watch_Cookies",
      { nothing: "nothing" },
      {
        withCredentials: true,
      }
    );
    request.then((res) => {
      //Bug loogin pode estar aqui envolvido
      if (res.data === "sucess") {
        setLoggedIn(true);
        setTest("Loaded");
      } else {
        setLoggedIn(false);
        setTest("Loaded");
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <LoginChecker loggedIn={loggedIn} setLoggedIn={setLoggedIn} test={test} />
      <LogOut loggedIn={loggedIn}></LogOut>
      <Switch>
        <Route path="/MOSGUITO/general-configuration">
          <Config
            configData={configData}
            onConfigChange={onConfigChange}
            onConfigOverwrite={onConfigOverwrite}
            hasMt={hasMt}
            toggleHasMt={toggleHasMt}
            hasMp={hasMp}
            toggleHasMp={toggleHasMp}
            experimentsFiles={experimentsFiles}
          />
        </Route>

        <Route path="/MOSGUITO/experiments">
          <Experiments
            experiments={configData.experiments}
            setExperiments={(value) => onConfigChange("experiments", value)}
            experimentsFiles={experimentsFiles}
            setExperimentsFiles={setExperimentsFiles}
          />
        </Route>

        <Route path="/MOSGUITO/uniprot-columns">
          <UniprotColumns
            uniprotList={configData.upimapiColumns}
            onChange={(value) => onConfigChange("upimapiColumns", value)}
          />
        </Route>

        <Route path="/MOSGUITO/uniprot-databases">
          <UniprotDatabases
            uniprotList={configData.upimapiDatabases}
            onChange={(value) => onConfigChange("upimapiDatabases", value)}
          />
        </Route>

        <Route path="/MOSGUITO/keggmaps">
          <KeggMaps configData={configData} onConfigChange={onConfigChange} />
        </Route>

        <Route path="/MOSGUITO/about"></Route>

        <Route path="/MOSGUITO/upload_inputs">
          <Upload_inputs />
        </Route>

        <Route path="/MOSGUITO/my_inputs">
          <My_inputs />
        </Route>

        <Route path="/MOSGUITO/start_server">
          <ServerAnalyses
            configData={configData}
            onConfigChange={onConfigChange}
          />
        </Route>

        <Route path="/MOSGUITO/members">
          <MembersPage />
        </Route>

        <Route path="/MOSGUITO/project">
          <ProjectPage />
        </Route>

        <Route path="/MOSGUITO/about">
          <AboutPage />
        </Route>

        <Route path="/MOSGUITO/another/teams">
          <TeamsPage />
        </Route>

        <Route path="/MOSGUITO/results">
          <LoadResults
            outputsFiles={outputsFiles}
            setOutputsFiles={setOutputsFiles}
            onConfigOverwrite={onConfigOverwrite}
          />
        </Route>

        <Route path="/MOSGUITO/load-results">
          <LoadResults
            outputsFiles={outputsFiles}
            setOutputsFiles={setOutputsFiles}
            onConfigOverwrite={onConfigOverwrite}
          />
        </Route>

        <Route path="/MOSGUITO/fastqc-reports">
          <FastQCFiles outputsFiles={outputsFiles} />
        </Route>

        <Route path="/MOSGUITO/assembly-qc">
          <AssemblyQC outputsFolder={outputsFiles.asReports} />
        </Route>

        <Route path="/MOSGUITO/annotation-results">
          <AnnotationResults outputsFiles={outputsFiles.KronaPlots} />
        </Route>

        <Route path="/MOSGUITO/differential-analysis">
          <DifferentialResults outputsFiles={outputsFiles.Heatmaps} />
        </Route>

        <Route path="/MOSGUITO/keggmaps-results">
          <KeggmapsResults outputsFiles={outputsFiles.KEGGMaps} />
        </Route>

        <Route path="/MOSGUITO/entry-reports">
          <EntryReports outputsFolder={outputsFiles.entryReport} />
        </Route>

        <Route path="/MOSGUITO/general-reports">
          <GeneralReports outputsFolder={outputsFiles.generalReport} />
        </Route>

        <Route path="/MOSGUITO/protein-reports">
          <ProteinReports outputsFolder={outputsFiles.proteinReport} />
        </Route>

        <Route path="/MOSGUITO/login">
          <Loggin loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Route>

        <Route path="/MOSGUITO">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

const LoginChecker = ({ loggedIn, setLoggedIn, test }) => {
  console.log(test);
  console.log(loggedIn);
  if (!loggedIn) {
    if (test === "Loading") {
      return (
        <div
          style={{ backgroundColor: "white", width: "100%", height: "100%" }}
        ></div>
      );
    } else {
      return <Redirect to="/MOSGUITO/login"></Redirect>;
    }
  } else {
    return <></>;
  }
};
