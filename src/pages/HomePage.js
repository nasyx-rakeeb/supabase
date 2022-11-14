import React from "react";
import { useNavigate } from "react-router-dom";

import { Grid, Button } from "@mui/material";
// import { getAllEmployees } from "../services/employeeServices";

function HomePage() {
  const navigate = useNavigate();

  async function handleSub() {
    // await getAllEmployees();
    navigate("/employees");
  }

  return (
    <Grid
      gap={3}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Button mr={10} variant="outlined" onClick={handleSub}>
        Employee
      </Button>
      <Button variant="outlined" onClick={() => navigate("/projects")}>
        Projects
      </Button>
    </Grid>
  );
}

export default HomePage;
