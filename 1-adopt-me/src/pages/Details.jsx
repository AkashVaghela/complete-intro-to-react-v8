import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPets from "../api/fetchPet";
import AdoptedPetCtx from "../context/AdoptedPetContext";
import Carousel from "../components/Carousel";
import ErrorBoundry from "../components/ErrorBoundry";
import Modal from "../components/Modal";

const Details = () => {
  const [showModal, setShowModal] = useState(false);

  const [_, setAdoptedPet] = useContext(AdoptedPetCtx); // eslint-disable-line no-unused-vars

  const { id } = useParams();
  const navigate = useNavigate();
  const results = useQuery(["details", id], fetchPets);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal && (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

const DetailsErrorBoundy = (props) => {
  return (
    <ErrorBoundry>
      <Details {...props} />
    </ErrorBoundry>
  );
};

export default DetailsErrorBoundy;
