import { useEffect, useState } from "react";
import Pet from "./Pet";
import useBreedList from "./useBreedList";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SeachParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breedList] = useBreedList(animal);

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?amimal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          location
          <input
            type="text"
            name="location"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animals">
          animals
          <select
            id="animals"
            name="animals"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            {ANIMALS.map((animal, index) => (
              <option key={index}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breeds">
          breeds
          <select
            id="breeds"
            name="breeds"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            disabled={breedList.length === 0}
          >
            {breedList.map((breed, index) => (
              <option key={index}>{breed}</option>
            ))}
          </select>
        </label>
        <button>submit</button>
      </form>
      {pets.map((pet) => {
        return (
          <Pet
            key={pet.id}
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
          />
        );
      })}
    </div>
  );
};

export default SeachParams;
