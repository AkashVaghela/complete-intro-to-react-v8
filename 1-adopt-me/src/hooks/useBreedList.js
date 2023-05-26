import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "../api/fetchBreedList";

// const localCache = {};

const useBreedList = (animal) => {
  // const [breedList, setBreedList] = useState([]);
  // const [status, setStatus] = useState("unloaded");

  // useEffect(() => {
  //   if (!animal) {
  //     return setBreedList([]);
  //   } else if (localCache[animal]) {
  //     return setBreedList(localCache[animal]);
  //   } else {
  //     requestBreedList();
  //   }

  //   async function requestBreedList() {
  //     setBreedList([]);
  //     setStatus("isloading");

  //     const res = await fetch(
  //       `http://pets-v2.dev-apis.com/pets?amimal=${animal}`
  //     );
  //     const json = await res.json();
  //     localCache[animal] = json.breeds || [];
  //     setBreedList(localCache[animal]);
  //     setStatus("loaded");
  //   }
  // }, [animal]);

  const results = useQuery(["breeds", animal], fetchBreedList);

  return [results?.data?.breeds ?? [], results.status];
};

export default useBreedList;
