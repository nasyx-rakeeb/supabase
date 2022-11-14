import { Grid, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { addEmployee, updateEmployee } from "../services/employeeServices";
import { useSearchParams } from "react-router-dom";

function AddNewEmployee() {
  let [searchParams] = useSearchParams();
  console.log();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(searchParams?.get("name"));
  const [number, setNumber] = useState(searchParams?.get("number"));
  const navigate = useNavigate();
  const isEdit = searchParams.get("name");
  const id = searchParams.get("id");

  async function handleSubmit() {
    setLoading(true);
    setError("");
    if (name === "" || number === "") {
      setLoading(false);
      return setError("Name and Number of Projects can't be empty");
    }

    if (isEdit) {
      const res = await updateEmployee(id, {
        name: name,
        numberOfProjects: number,
      });
      console.log(res);
      if (res === null || res === undefined) {
        setLoading(false);
        navigate("/employees");
      }
      if (res?.message) {
        setError(res.message);
        setLoading(false);
      }
    }

    if (!isEdit) {
      const res = await addEmployee({ name, numberOfProjects: number });
      if (res === null || res === undefined) {
        setLoading(false);
        navigate("/employees");
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
        {isEdit ? "Update Employee" : "Add New Employee"}
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
          <TextField
            id="outlined-basic"
            label="Number of Projects"
            variant="outlined"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
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

export default AddNewEmployee;
