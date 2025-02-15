import React from "react";
import { withStyles } from "@material-ui/core/styles";
import LabelledSelect from "./LabelledSelect";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@material-ui/core";
import download from "../utils/download";
import TSV from "tsv";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
});

const ExperimentsTable = ({
  experiments,
  setExperiments,
  setExperimentsFiles,
  experimentsFiles,
}) => {
  const increaseRows = () => {
    const newExperiments = [...experiments];
    const newExperimentsFiles = [...experimentsFiles];

    newExperiments.push({
      Files: "",
      Sample: "",
      "Data type": "",
      Condition: "",
      Name: "",
    });
    newExperimentsFiles.push([]);

    setExperiments(newExperiments);
    setExperimentsFiles(newExperimentsFiles);
  };

  const decreaseRows = () => {
    const newExperiments = [...experiments];
    const newExperimentsFiles = [...experimentsFiles];

    newExperiments.pop();
    newExperimentsFiles.pop();

    if (experiments.length > 1) {
      setExperiments(newExperiments);
    }
    setExperimentsFiles(newExperimentsFiles);
  };

  const editExperiments = (value, n, field) => {
    const newExperiments = [...experiments];

    newExperiments[n][field] = value;

    setExperiments(newExperiments);
  };

  return (
    <Paper>
      <Button
        onClick={(ev) => increaseRows()}
        variant="contained"
        color="primary"
        style={{ margin: "0.5rem" }}
      >
        Add row
      </Button>
      <Button
        onClick={(ev) => decreaseRows()}
        variant="contained"
        color="primary"
      >
        Remove last row
      </Button>
      <Button
        onClick={(ev) =>
          download(TSV.stringify(experiments), "experiments.tsv", "tsv")
        }
        variant="contained"
        color="secondary"
        style={{ margin: "0.5rem" }}
      >
        Download TSV
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Files</TableCell>
            <TableCell width="20%">Sample</TableCell>
            <TableCell width="15%">Data type</TableCell>
            <TableCell width="10%">Condition</TableCell>
            <TableCell width="20%">Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array(experiments.length)
            .fill()
            .map((_, n) => (
              <TableRow key={n}>
                <TableCell>
                  <TextField
                    type="text"
                    value={experiments[n]["Files"]}
                    placeholder={""}
                    disabled
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    type="text"
                    value={experiments[n]["Sample"]}
                    onChange={(ev) =>
                      editExperiments(ev.target.value, n, "Sample")
                    }
                    placeholder={""}
                  />
                </TableCell>

                <TableCell>
                  <LabelledSelect
                    type="text"
                    value={experiments[n]["Data type"]}
                    onChange={(ev) =>
                      editExperiments(ev.target.value, n, "Data type")
                    }
                    options={["dna", "mrna", "protein"]}
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    type="text"
                    value={experiments[n]["Condition"]}
                    onChange={(ev) =>
                      editExperiments(ev.target.value, n, "Condition")
                    }
                    placeholder={""}
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    type="text"
                    value={experiments[n]["Name"]}
                    onChange={(ev) =>
                      editExperiments(ev.target.value, n, "Name")
                    }
                    placeholder={""}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default withStyles(styles)(ExperimentsTable);
