import React, { useMemo, useState } from "react";
import { DashboardLayout } from "../components/Layout";
import { Button, Toolbar, Typography } from "@material-ui/core";
import Select from "react-select";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Typography variant="h4">Input Files</Typography>
      <Typography variant="h6">Upload your files</Typography>
    </header>
  );
};

const Main = () => {
  const [type, setType] = useState("");
  const different_types = [
    { value: "Contigs", label: "Contigs" },
    { value: "Entry_report", label: "Entry_report" },
    { value: "fastq", label: "fastq" },
    { value: "scaffolds", label: "scaffolds" },
    { value: "fgs", label: "fgs" },
  ];
  const changeType = (e) => {
    setType(e);
  };
  const [fullSpace, setfullSpace] = useState(false);
  const [file, setFile] = useState([]);
  const handleFile = (e) => {
    setFile(e);
  };
  const sendFiles = () => {
    const formData = new FormData();
    formData.append("el_file", file[0]);
    formData.append("type", type.value);
    axios
      .post("http://127.0.0.1:5002/Submit_input_file", formData, {
        withCredentials: true,
      })
      .then((res) => {
        const resposte = res.data;
        if (resposte == "No space") {
          alert("No space in your!"); //fazer um useState para fazer um redirect para a pagina dos meus inputs
          setfullSpace(true);
        }
        if (resposte == "File already Exists") {
          alert("File not submitted, File already exists");
        } else {
          alert("File saved!");
          window.location.reload(false);
        }
      });
  };

  return (
    <>
      <input
        type="file"
        onChange={(ev) => {
          handleFile(ev.target.files);
        }}
      />
      <Select options={different_types} value={type} onChange={changeType} />
      <Button
        onClick={() => sendFiles()}
        variant="contained"
        color="secondary"
        component="label"
      >
        Upload File
      </Button>
    </>
  );
  //}else{
  //<Redirect to='/MOSGUITO/my_inputs' /> //Nao estaa funcionar averiguar depois
  //}
};

const Upload_inputs = () => {
  return (
    <DashboardLayout>
      <div className="App">
        <Header />
        <Main />
      </div>
    </DashboardLayout>
  );
};

export default Upload_inputs;
