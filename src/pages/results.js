import React from "react";
import { DashboardLayout } from "../components/Layout";
import { Button, Toolbar, Typography } from "@material-ui/core";
import * as zip from "@zip.js/zip.js";
import $ from "jquery";
import DataTable from "react-data-table-component";
zip.configure({ useWebWorkers: false });

const treatName = (name) => {
  let resultingString = name.split("/");
  resultingString = resultingString[resultingString.length - 1];
  resultingString = resultingString.split(".");
  return resultingString[0];
};

async function ObtainBlobArray(event) {
  const file = event.target.files[0];
  const blobReader = new zip.BlobReader(file);
  const zipReader = new zip.ZipReader(blobReader);

  const entries = await zipReader.getEntries();

  let KronaPlotsResults = [];
  let FastQCReports = [];
  let DifferentailExpressionResults = [];
  let KEGGMapsResults = [];
  let Assembly = [];
  let entry = [];
  let configFile = [];
  let general = [];
  let protein = [];

  for (let i = 0; i < entries.length; i++) {
    if (entries[i].directory === false && entries[i].compressedSize !== 0) {
      if (entries[i].filename.includes("Preprocess")) {
        const blobFastQC = await entries[i].getData(
          new zip.BlobWriter(["text/html"])
        );
        let fastQcName = treatName(entries[i].filename);
        FastQCReports.push({ name: fastQcName, blob: blobFastQC });
      }
      if (entries[i].filename.includes("Annotation")) {
        const blobKronaPlots = await entries[i].getData(
          new zip.BlobWriter(["text/html"])
        );
        let kronaPlotsNames = treatName(entries[i].filename);
        KronaPlotsResults.push({ name: kronaPlotsNames, blob: blobKronaPlots });
      }
      if (entries[i].filename.includes("Differential expression analysis")) {
        const blobHeatmaps = await entries[i].getData(
          new zip.BlobWriter(["image/jpeg"])
        );
        let heatMapsNames = treatName(entries[i].filename);
        DifferentailExpressionResults.push({
          name: heatMapsNames,
          blob: blobHeatmaps,
        });
      }
      if (entries[i].filename.includes("KEGGMaps")) {
        const blobKEGGMaps = await entries[i].getData(
          new zip.BlobWriter(["image/png"])
        );
        let keggMaps = treatName(entries[i].filename);
        let number = KEGGMapsResults.length;
        KEGGMapsResults.push({ name: [number, keggMaps], blob: blobKEGGMaps });
      }
      if (entries[i].filename.includes("Assembly")) {
        const AssemblyReports = await entries[i].getData(
          new zip.BlobWriter(["text/tab-separated-values"])
        );
        let assemblyName = treatName(entries[i].filename);
        Assembly.push({ name: assemblyName, blob: AssemblyReports });
      }
      if (entries[i].filename.includes("Entry")) {
        const entryReport = await entries[i].getData(
          new zip.BlobWriter(["text/tab-separated-values"])
        );
        let entryName = treatName(entries[i].filename);
        entry.push({ name: entryName, blob: entryReport });
      }
      if (entries[i].filename.includes("config")) {
        const config = await entries[i].getData(
          new zip.BlobWriter(["application/json"])
        );
        const fileUrl = URL.createObjectURL(config);
        $.getJSON(fileUrl, function (json) {
          configFile = json;
        });
      }
      if (entries[i].filename.includes("General")) {
        const genReport = await entries[i].getData(
          new zip.BlobWriter(["text/tab-separated-values"])
        );
        let genName = treatName(entries[i].filename);
        general.push({ name: genName, blob: genReport });
      }
      if (entries[i].filename.includes("Protein")) {
        const proteinReport = await entries[i].getData(
          new zip.BlobWriter(["text/tab-separated-values"])
        );
        let protName = treatName(entries[i].filename);
        protein.push({ name: protName, blob: proteinReport });
      }
    }
  }
  await zipReader.close();
  return [
    {
      qcReports: FastQCReports,
      KronaPlots: KronaPlotsResults,
      Heatmaps: DifferentailExpressionResults,
      KEGGMaps: KEGGMapsResults,
      asReports: Assembly,
      entryReport: entry,
      generalReport: general,
      proteinReport: protein,
    },
    configFile,
  ];
}

const Main = ({ outputsFiles, setOutputsFiles, onConfigOverwrite }) => {
  const [data, setData] = useState([]);

  const formData = new FormData();
  useState(() => {
    axios
      .post("http://127.0.0.1:5002/Get_my_analyses", formData, {
        withCredentials: true,
      })
      .then((res) => {
        const results = res.data;
        setData(results["my_info"]);
      });
  });

  const snakeToCamelCase = (str) => {
    return str.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace("-", "").replace("_", "");
    });
  };

  const handleZipChange = async (event) => {
    const formData = new FormData();
    formData.append("ID", JSON.stringify(event));

    axios
      .post(
        "http://127.0.0.1:5002/Get_my_analyses/Get_Diferent_Outputs/results",
        formData,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const results = res.data;
        let Output = ObtainBlobArray(results);
        setOutputsFiles(Output[0]);
        Object.keys(Output[1]).map(
          (key) =>
            delete Object.assign(Output[1], {
              [snakeToCamelCase(key)]: Output[1][key],
            })
        );
        onConfigOverwrite(Output[1]);
      });
    //no fim da funçao redirecionar para uma pagina a contruir onde vai estar o novo sidebar
  };

  const DownloadZip = (id) => {
    //Fazer a partir do ID fazer o download da pasta comprimida dos resultados
  };
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
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const columns = [
    {
      name: "Analyses Name",
      selector: (row) => row.file_name,
      sortable: true,
    },
    {
      name: "Data",
      selector: (row) => row.data,
      sortable: true,
    },
    {
      name: "Visualize",
      button: true,
      cell: (row) => (
        <Button onClick={handleZipChange(row.id)}>Visualize Results</Button>
      ),
    },
    {
      name: "Download",
      button: true,
      cell: (row) => (
        <Button onClick={DownloadZip(row.id)}>Download Results</Button>
      ),
    },
  ];

  if (data !== undefined) {
    const filteredItems = data.filter(
      (item) =>
        JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
        -1
    );

    return (
      //fazer alteraçao para lista  a parte do butao fica para dwonload e outro para ver resultados
      <>
        <DataTable
          style={{ width: "100%", height: "100%", margin: "auto" }}
          title="My Results"
          pagination
          paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
          noHeader
          striped
          subHeader
          subHeaderComponent={subHeaderComponent}
          columns={columns}
          data={filteredItems}
        />
      </>
    );
  } else {
    return (
      <>
        <DataTable
          style={{ width: "100%", height: "100%", margin: "auto" }}
          title="My Results"
          pagination
          paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
          noHeader
          striped
          subHeader
          subHeaderComponent={subHeaderComponent}
          columns={columns}
          data={[]}
        />
      </>
    );
  }
};

export const LoadResults = ({
  outputsFiles,
  setOutputsFiles,
  onConfigOverwrite,
}) => {
  return (
    <DashboardLayout>
      <Toolbar>
        <Typography variant="h6">MOSCA results page</Typography>
      </Toolbar>
      <Main
        outputsFiles={outputsFiles}
        setOutputsFiles={setOutputsFiles}
        onConfigOverwrite={onConfigOverwrite}
      />
    </DashboardLayout>
  );
};
