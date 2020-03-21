import React, { useState } from "react";

import { navigate } from "@reach/router";

import axios from "axios";

const CreatePet = props => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = event => {
    event.preventDefault();

    const newPet = {
      name,
      type,
      desc,
      skill1,
      skill2,
      skill3
    };

    axios
      .post("http://localhost:8000/api/pets", newPet)
      .then(res => {
        navigate("/pets/");
      })
      .catch(err => {
        console.error(err.response);
        if (err.response.data.name === "MongoError") {
          setErrors({ name: { message: "Pet Name already Exist" } });
        } else {
          setErrors(err.response.data.errors);
        }
      });
  };

  return (
    <>
      <h1>Know a pet needing a new home?</h1>
      <div className="single-container">
        <h2>New Pet</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Pet Name: </label>
            <input
              onChange={event => setName(event.target.value)}
              type="text"
            />
            {errors.name ? (
              <span className="error">{errors.name.message}</span>
            ) : (
              ""
            )}
          </div>

          <div>
            <label>Pet Type: </label>
            <input
              onChange={event => setType(event.target.value)}
              type="text"
            />
            {errors.type ? (
              <span className="error">{errors.type.message}</span>
            ) : (
              ""
            )}
          </div>

          <div>
            <label>Pet Description: </label>
            <textarea
              onChange={event => setDesc(event.target.value)}
              type="text"
            ></textarea>
            {errors.desc ? (
              <span className="error">{errors.desc.message}</span>
            ) : (
              ""
            )}
          </div>
          <div>
            <label>Skill 1: </label>
            <input
              onChange={event => setSkill1(event.target.value)}
              type="text"
            />
          </div>
          <div>
            <label>Skill 2: </label>
            <input
              onChange={event => setSkill2(event.target.value)}
              type="text"
            />
          </div>
          <div>
            <label>Skill 3: </label>
            <input
              onChange={event => setSkill3(event.target.value)}
              type="text"
            />
          </div>
          <button class="btn btn-primary">Add Pet</button>
        </form>
      </div>
    </>
  );
};

export default CreatePet;
