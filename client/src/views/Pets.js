import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "@reach/router";

const Pets = props => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets")
      .then(res =>
        setPets(
          res.data.sort((a, b) => {
            if (a.type < b.type) return -1;

            if (a.type > b.type) return 1;

            return 0;
          })
        )
      )
      .catch(console.log);
  }, []);

  const handleDelete = idToDel => {
    axios
      .delete("http://localhost:8000/api/pets/" + idToDel)
      .then(res => {
        const filteredPosts = pets.filter(pet => pet._id !== idToDel);
        setPets(filteredPosts);
      })
      .catch(console.log);
  };

  return (
    <>
      <div>
        <h3>These pets are looking for a good home</h3>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet, idx) => (
              <tr key={idx}>
                <td>{pet.name}</td>
                <td>{pet.type}</td>
                <td>
                  <Link to={"/pets/" + pet._id}>Details</Link> |{" "}
                  <Link to={"/pets/" + pet._id + "/edit"}>Edit</Link> |{" "}
                  <button onClick={event => handleDelete(pet._id)}>
                    Adopt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Pets;
