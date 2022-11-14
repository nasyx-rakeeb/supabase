import {
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { getAllEmployees } from "../services/employeeServices";
import { useSearchParams } from "react-router-dom";
import { addProject, updateProject } from "../services/projectServices";

function AddNewProject() {
  let [searchParams] = useSearchParams();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(searchParams?.get("name"));
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const isEdit = searchParams.get("name");
  const id = searchParams.get("id");

  //   const [sele, setAge] = React.useState("");
  const [selected, setSelected] = useState(searchParams?.get("createdBy"));
  const [selectedStatus, setSelectedStatus] = useState(
    searchParams?.get("status")
  );

  useLayoutEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    const res = await getAllEmployees();
    if (res?.message) {
      return setLoading(false);
    } else {
      setData(res);
    }
    setLoading(false);
  }

  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  async function handleSubmit() {
    setLoading(true);
    setError("");
    if (name === "" || !selected || !selectedStatus) {
      setLoading(false);
      return setError("Name, Employee and Status of Projects can't be empty");
    }

    if (isEdit) {
      const res = await updateProject(id, {
        name: name,
        status: selectedStatus,
        createdBy: selected,
      });
      console.log(res);
      if (res === null || res === undefined) {
        setLoading(false);
        navigate("/projects");
      }
      if (res?.message) {
        setError(res.message);
        setLoading(false);
      }
    }

    if (!isEdit) {
      const res = await addProject({
        name,
        status: selectedStatus,
        createdBy: selected,
      });
      if (res === null || res === undefined) {
        setLoading(false);
        navigate("/projects");
      }
      if (res?.message) {
        setError(res.message);
        setLoading(false);
      }
    }

    // console.log(name, number);
  }
  return (
    <Grid
      container
      style={{
        margin: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Typography mb={2} variant="h5">
        {isEdit ? "Update Project" : "Add New Project"}
      </Typography>
      {loading ? (
        <Loading />
      ) : (
        <Grid
          gap={3}
          container
          style={{ display: "flex", flexDirection: "column", width: "30%" }}
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormControl>
            <InputLabel>Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedStatus}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value={"On Hold"}>On Hold</MenuItem>
              <MenuItem value={"Inprogress"}>In Progress</MenuItem>
              <MenuItem value={"Resolved"}>Resolved</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel>Employee</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selected}
              label="Employee"
              onChange={handleChange}
            >
              {data.map((item) => (
                <MenuItem value={item?.id} key={item.name}>
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="outlined" onClick={handleSubmit}>
            Submit
          </Button>
          {error && (
            <Typography style={{ color: "red" }} variant="subtitle">
              {error}
            </Typography>
          )}
        </Grid>
      )}
    </Grid>
  );
}

export default AddNewProject;
