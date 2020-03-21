import React, { useEffect, useState } from "react";

import { navigate } from "@reach/router";

import axios from "axios";

const EditPet = props => {
  console.log(props);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets/" + props.id)
      .then(res => {
        const pet = res.data;

        setName(pet.name);
        setType(pet.type);
        setDesc(pet.desc);
        setSkill1(pet.skill1);
        setSkill2(pet.skill2);
        setSkill3(pet.skill3);
      })
      .catch(console.log);
  }, [props.id]);

  const handleSubmit = event => {
    event.preventDefault();

    const editedPet = { name, type, desc, skill1, skill2, skill3 };

    axios
      .put("http://localhost:8000/api/pets/" + props.id, editedPet)
      .then(res => navigate("/pets/" + res.data._id))
      .catch(err => {
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="single-container">
      <h2>Edit {name}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            onChange={event => setName(event.target.value)}
            value={name}
            type="text"
          />
          {errors.name ? (
            <span className="error">{errors.name.message}</span>
          ) : (
            ""
          )}
        </div>

        <div>
          <label>Type: </label>
          <textarea
            onChange={event => setType(event.target.value)}
            value={type}
            type="text"
          ></textarea>
          {errors.type ? (
            <span className="error">{errors.type.message}</span>
          ) : (
            ""
          )}
        </div>

        <div>
          <label>Description: </label>
          <input
            onChange={event => setDesc(event.target.value)}
            value={desc}
            type="text"
          />
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
            value={skill1}
            type="text"
          />
        </div>
        <div>
          <label>Skill 2: </label>
          <input
            onChange={event => setSkill2(event.target.value)}
            value={skill2}
            type="text"
          />
        </div>
        <div>
          <label>Skill 3: </label>
          <input
            onChange={event => setSkill3(event.target.value)}
            value={skill3}
            type="text"
          />
        </div>
        <button class="btn btn-primary">Edit Pet</button>
      </form>
    </div>
  );
};

export default EditPet;
