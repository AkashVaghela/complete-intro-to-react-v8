import { Link } from "react-router-dom";

// const Friends = (props) => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name),
//   ]);
// };

const Pet = (props) => {
  const { id, images, name, animal, breed, location } = props;
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";

  //  We need it to throw if there's an error and fetch wouldn't throw here if there's a 400 or a 500 error.
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
