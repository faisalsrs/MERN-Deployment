import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import axios from "axios";

// id prop comes from the URL, see routing :id
const SinglePet = ({ id }) => {
  const [pet, setPet] = useState([]);
  const [msg, setMsg] = useState("loading...");
  const [alreadyVoted, setAlreadyVoted] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets/" + id)
      .then(res => setPet(res.data))
      .catch(setMsg("Sumtin Wrong"));
  }, [id]);

  const handleDelete = idToDel => {
    axios
      .delete("http://localhost:8000/api/pets/" + idToDel)
      .then(() => {
        navigate("/pets/");
      })
      .catch(console.log);
  };

  const handleVote = isUpvote => {
    if (alreadyVoted) {
      return;
    }

    if (isUpvote) {
      pet.likeCount++;
    }

    axios
      .put("http://localhost:8000/api/pets/" + id, pet)
      .then(res => {
        const updatedPet = res.data;
        setPet(updatedPet);
        setAlreadyVoted(true);
      })
      .catch(console.log);
  };

  if (pet === null) {
    return msg;
  }

  return (
    <div className="text-center">
      <h2>Details About: {pet.name}</h2>
      <button class="btn btn-danger" onClick={event => handleDelete(pet._id)}>
        Adopt {pet.name}
      </button>
      <div className="single-container">
        <p>Pet Type: {pet.type}</p>
        <p>Description {pet.desc}</p>
        <p>Skills:</p>
        <p>{pet.skill1} </p>
        <p>{pet.skill2} </p>
        <p>{pet.skill3} </p>
        <button
          onClick={event => handleVote(true)}
          className="arrow"
          class="btn btn-success"
        >
          {" "}
          Like {pet.name}{" "}
        </button>
        <p>{pet.likeCount}&uarr; likes </p>
      </div>
    </div>
  );
};

export default SinglePet;
