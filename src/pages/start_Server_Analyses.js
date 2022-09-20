import React, { useMemo, useState } from "react";
import { DashboardLayout } from "../components/Layout";
import { Button, Toolbar, Typography } from "@material-ui/core";
import Select from "react-select";
import axios from "axios";
import Accordion from "../components/Accordion";
import LabelledCheckbox from "../components/LabelledCheckbox";
import getType from "../components/analysesTypes";
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Icon from "awesome-react-icons";
import { TextField } from "@material-ui/core";

const Header = () => {
  return (
    <header className="header">
      <Typography variant="h4">Start my Analyses</Typography>
      <Typography variant="h6">
        Go to Configuration to config analyses
      </Typography>
    </header>
  );
};

const Main = ({ configData, onConfigChange }) => {
  const analyses = [
    "preprocess",
    "join_reads",
    "assembly",
    "binning",
    "fastq2fasta",
    "annotation",
    "recognizer",
    "quantification_analysis",
    "metaphlan",
    "protein_report",
    "entry_report",
    "differential_expression",
    "keggcharter",
  ];
  const [analyses_delta, setAnalyses] = useState([]); //eventualmete vai para app.js para n se perder quando o utilizador alterar de experiments ou config para a pagina inicial.
  const [buttons, setButtons] = useState({});
  const [current, setCurrent] = useState("");
  const [currentRowType, setCurrentRowType] = useState([]); //eventualmete vai para app.js para n se perder quando o utilizador alterar de experiments ou config para a pagina inicial.
  const [max_val, setMax_val] = useState(2);
  const [inputState, setInputState] = useState(false);
  const [SelectedFile, setSelectedFile] = useState(false);
  let index = 0;
  const handleCheck = (value) => {
    const newList = [...analyses_delta];
    const index_handle = newList.indexOf(value);
    if (index_handle > -1) {
      newList.splice(index_handle, 1);
    } else {
      newList.push(value);
    }
    setAnalyses(newList);
  };
  const [inputFiles, setInputFiles] = useState([]);
  const [allInputs, setAllInputs] = useState([]);
  const showRespectiveListInput = function (rowExp, list) {
    const inputFilesButtons = [...allInputs]; //TODO all inputs tranforma a segunda string num valor boleano dont know why...
    let rowExp_1 = rowExp.split(": ");
    for (let m = 0; m < allInputs.length; m++) {
      if ((allInputs[m][1] = !rowExp_1[rowExp_1.length - 1])) {
        const teste = inputFilesButtons.indexOf(allInputs[m]);
        if (teste > -1) {
          inputFilesButtons.splice(teste, 1);
        }
      }
    }
    const max_1 = [
      "fgs",
      "tsv",
      "readcounts",
      "contigs",
      "scaffolds",
      "piled_piled_fasta",
    ]; //fazer alteraçao tambem vai depender de inputs e de reverse forward etc...
    if (max_1.includes(rowExp_1[rowExp_1.length - 1])) {
      setMax_val(1);
    }
    setInputFiles(inputFilesButtons);
    setCurrentRowType(list);
    setCurrent(rowExp);
  };
  const [isOpen, setIsOpen] = useState(false);
  const SheckAccordion = () => {
    if (analyses_delta.length === 0) {
      alert("No analyses selected");
      setIsOpen(false);
      return;
    }
    let smallIndex = 9999999;
    analyses_delta.forEach((parse) => {
      if (analyses.includes(parse)) {
        if (analyses.indexOf(parse) < smallIndex) {
          smallIndex = analyses.indexOf(parse);
        }
      }
    });
    setIsOpen(!isOpen);
    const type = getType(analyses[smallIndex]);
    const formDataFilesNames = new FormData();
    formDataFilesNames.append("Types", JSON.stringify(type));
    axios
      .post(
        "http://127.0.0.1:5002/Get_my_inputs/StartAnalyses",
        formDataFilesNames,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        //buscar inputs type do do utilizador a partir do type falta alterar APIs.
        const results = res.data;
        const todayFiles = results["my_info"].map((value) => {
          return [value.file_name, value.file_type];
        });
        setAllInputs(todayFiles);
        setInputFiles(todayFiles);
      });
    let choosenButtons = {};
    for (let i = 0; i < configData.experiments.length; i++) {
      for (let x = 0; x < type.length; x++) {
        choosenButtons[configData.experiments[i].Name + " / type: " + type[x]] =
          []; //alteraçao para inserir os nomes nos botoes para forward reverse e tambem para os respetivos sample. Necessita eventualmente de outro js
      }
    }
    setButtons(choosenButtons);
    setCurrentRowType([]);
    setCurrent("");
    setMax_val(2);
  };
  const camelToSnakeCase = (str) =>
    str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  const startAnalyses = () => {
    if (analyses_delta.includes("preprocess")) {
      for (let x = 0; x < configData.experiments.length; x++) {
        let frase = "";
        let count = 0;
        for (
          let m = 0;
          m < buttons[configData.experiments[x].Name + " / type: fastq"].length;
          m++
        ) {
          if (count == 0) {
            frase =
              buttons[configData.experiments[x].Name + " / type: fastq"][m];
            count += 1;
          } else {
            frase =
              frase +
              "," +
              buttons[configData.experiments[x].Name + " / type: fastq"][m];
          }
        }
        configData.experiments[x].Files = frase;
      }
    }
    let workflow = [];
    for (let a = 0; a < analyses.length; a++) {
      if (analyses_delta.indexOf(analyses[a]) > -1) {
        workflow.push(analyses[a]);
      }
    }
    if (workflow == analyses) {
      workflow = ["all"];
    }
    const formData = new FormData();
    let snake_case_values = {};
    Object.keys(configData).map(
      (key) => (snake_case_values[camelToSnakeCase(key)] = configData[key])
    );
    snake_case_values = JSON.stringify(snake_case_values);
    let greatFiles = {};
    Object.keys(buttons).map(
      (key) => (greatFiles[camelToSnakeCase(key)] = buttons[key])
    );
    greatFiles = JSON.stringify(greatFiles);
    formData.append("config", snake_case_values);
    formData.append("Workflow", workflow);
    formData.append("Files", greatFiles);
    axios.post("http://localhost:5002/Submit_for_analyses", formData, {
      withCredentials: true,
    });
  };
  const moveUP = () => {
    if (buttons[current] === undefined) {
      alert("No Row of experiments selected");
    } else {
      buttons[current].splice(buttons[current].indexOf(inputState), 1);
      setInputState(false);
    }
  };
  const clearSelection = () => {
    if (buttons[current] === undefined) {
      alert("No Row of experiments selected");
    } else {
      buttons[current] = [];
      setInputState(false);
      showRespectiveListInput(current, buttons[current]);
    }
  };
  const moveDown = () => {
    if (currentRowType.length > max_val) {
      alert("Max number of files for that Row");
    }
    if (buttons[current] === undefined) {
      alert("No Row of experiments selected");
    } else {
      buttons[current].push(SelectedFile);
      setSelectedFile(false);
    }
  };
  const selectInput = (e) => {
    setInputState(e.target.value);
  };
  const selectedFile = (e) => {
    setSelectedFile(e.target.value);
  };
  return (
    <div style={{ margin: "0.5rem" }}>
      <Accordion title="Choose yout Analyses">
        {analyses.map((name) => {
          let isDisabled = true;
          const whatchCheckMinus = analyses_delta.indexOf(
            analyses[analyses.indexOf(name) - 1]
          );
          const whatchCheckMax = analyses_delta.indexOf(
            analyses[analyses.indexOf(name) + 1]
          );
          if (
            whatchCheckMinus > -1 ||
            analyses_delta.length === 0 ||
            whatchCheckMax > -1 ||
            analyses_delta.includes(name)
          ) {
            isDisabled = false;
          }
          index = index + 1;
          return (
            <LabelledCheckbox
              key={index}
              label={name}
              checked={analyses_delta.indexOf(name) > -1}
              setChecked={() => handleCheck(name)}
              isDisable={isDisabled}
            />
          );
        })}
      </Accordion>
      <Typography style={{ color: "white" }} variant="h6">
        Go to Configuration and write in the experiments file the Sample, type,
        condition, name
      </Typography>
      <MuiAccordion onChange={SheckAccordion} expanded={isOpen}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {"Match Input Files with Experiments Table"}
        </AccordionSummary>
        <div
          style={{
            backgroundImage: "linear-gradient(to bottom, #FAFAFA, #F2F2F2)",
            backgroundRepeat: "repeat-x",
            border: "1px solid #D4D4D4",
            borderRadius: "4px 4px 4px 4px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.067)",
            paddingLeft: "10px",
            paddinTop: "10px",
            width: "800px",
          }}
        >
          <div style={{ position: "relative", bottom: "8px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: "bold",
                marginLeft: "4px",
                marginRight: "5px",
                marginTop: "3px",
                marginBottom: "3px",
                float: "right",
              }}
            >
              Experiment Rows
              <div style={{ marginLeft: "5px" }}>
                {Object.keys(buttons).map(function (rowExperiments, index) {
                  return (
                    <Button
                      style={{}}
                      onClick={() =>
                        showRespectiveListInput(
                          rowExperiments,
                          buttons[rowExperiments]
                        )
                      }
                      color="secondary"
                      variant="contained"
                    >
                      {rowExperiments}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
          <select
            style={{ withd: "415px" }}
            multiple
            size={10}
            onChange={selectedFile}
          >
            {inputFiles.map((file) => {
              if (buttons[current] !== undefined) {
                if (buttons[current].includes(file[0])) {
                  return;
                }
              }
              return (
                <option value={file[0]} title={file[0]}>
                  {file[0]}
                </option>
              );
            })}
          </select>
          <span>
            <a
              style={{
                position: "relative",
                left: "36px",
                top: "0px",
                cursor: "pointer",
              }}
              onClick={moveUP}
            >
              <Icon name="arrow-up">...</Icon>
            </a>
            <a
              style={{
                position: "relative",
                left: "36px",
                top: "0px",
                cursor: "pointer",
              }}
              onClick={clearSelection}
            >
              <Icon name="minus">...</Icon>
            </a>
            <a
              style={{
                position: "relative",
                left: "36px",
                top: "0px",
                cursor: "pointer",
              }}
              onClick={moveDown}
            >
              <Icon name="arrow-down">...</Icon>
            </a>
          </span>
          <select
            multiple
            size={10}
            name="selection"
            id="selection"
            onChange={selectInput}
            style={{ withd: "415px" }}
          >
            {currentRowType.map((file) => {
              if (currentRowType.length > max_val) {
                alert("Max number of files for that Row");
              }
              return (
                <option value={file} title={file}>
                  {file}
                </option>
              );
            })}
          </select>
        </div>
      </MuiAccordion>
      <Accordion title="Analyses Name">
        <TextField
          onChange={(ev) => onConfigChange("name", ev.target.value)}
          value={configData.name}
        ></TextField>
      </Accordion>
      <Button color="primary" variant="contained" onClick={startAnalyses}>
        Go To Analyses
      </Button>
    </div>
  );
};

const ServerAnalyses = ({ configData, onConfigChange }) => {
  return (
    <DashboardLayout>
      <div className="App">
        <Header />
        <Main configData={configData} onConfigChange={onConfigChange} />
      </div>
    </DashboardLayout>
  );
};

export default ServerAnalyses;
