import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useBreedList from "../hooks/useBreedList";
import fetchSeach from "../api/fetchSearch";
import Results from "../components/Results";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SeachParams = () => {
  const [animal, setAnimal] = useState("");
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  const result = useQuery(["search", requestParams], fetchSeach);
  const pets = result?.data?.pets ?? [];

  const [breedList] = useBreedList(animal);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            location: formData.get("location") ?? "",
            breeds: formData.get("breeds") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        <label htmlFor="location">
          location
          <input type="text" name="location" id="location" />
        </label>
        <label htmlFor="animal">
          animal
          <select
            id="animal"
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            {ANIMALS.map((animal, index) => (
              <option key={index}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breeds">
          breeds
          <select id="breeds" name="breeds" disabled={breedList.length === 0}>
            {breedList.map((breed, index) => (
              <option key={index}>{breed}</option>
            ))}
          </select>
        </label>
        <button>submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SeachParams;
