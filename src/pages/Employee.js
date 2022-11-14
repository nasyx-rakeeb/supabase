import { Delete, Edit } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { deleteEmployee, getAllEmployees } from "../services/employeeServices";

function Employee() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  async function deleteHandler(id) {
    setLoading(true);
    await deleteEmployee(id);
    await getData();
  }

  async function editHandler(name, number, id) {
    navigate(`/employees/new?name=${name}&number=${number}&id=${id}`);
  }
  return (
    <>
      <Grid container style={{ padding: 25, marginTop: 20 }} gap={20}>
        <Typography variant="h4">Employees</Typography>
        <Button variant={"outlined"} onClick={() => navigate("/employees/new")}>
          Add New
        </Button>
      </Grid>
      {loading ? (
        <Grid container justifyContent="center" alignItems="center">
          <Loading />
        </Grid>
      ) : (
        <Grid
          gap={2}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // justifyContent: "center",
            width: "100vw",
            height: "100vh",
            padding: 25,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          {data.map((item) => (
            <Grid
              container
              item
              gap={5}
              style={{ backgroundColor: "rgba(0,0,0,0.2)", padding: 20 }}
              justifyContent="space-around"
              key={item.id}
            >
              <Grid item>{item.name}</Grid>
              <Grid item>{item.numberOfProjects}</Grid>
              <Grid item>{item.created_at}</Grid>
              <Edit
                onClick={() =>
                  editHandler(item.name, item.numberOfProjects, item.id)
                }
              />
              <Delete onClick={() => deleteHandler(item.id)} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default Employee;
