import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link, Redirect, Router } from "@reach/router";

import CreatePet from "./views/CreatePet";
import SinglePet from "./views/SinglePet";
import Pets from "./views/Pets";
import EditPet from "./views/EditPet";

function App() {
  return (
    <>
      <div className="container">
        <div class="row">
          <div class="col">
            <h1>Pet Shelter</h1>
          </div>
          <div class="col">
            <Link to="/pets/new">Add a pet to the shelter</Link>
          </div>
          <div class="col">
            <Link to="/pets/">Back to home</Link>
          </div>
        </div>
      </div>
      <div className="container-flex justify-content-center">
        <Router>
          <Redirect from="/" to="/pets" noThrow="true" />
          <CreatePet path="/pets/new" />
          <SinglePet path="/pets/:id" />
          <Pets path="/pets" />
          <EditPet path="/pets/:id/edit" />
        </Router>
      </div>
    </>
  );
}

export default App;
