import React from "react";
import { createRoot } from "react-dom/client";
import SeachParams from "./SearchParams";

// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, "Adopt me!"),
//     React.createElement(Friends, { name: "Sahas" }),
//     React.createElement(Friends, { name: "Kuldeep" }),
//     React.createElement(Friends, { name: "Subham" }),
//   ]);
// };

const App = () => {
  return (
    <div>
      <h1>Adopt me!</h1>
      <SeachParams />
    </div>
  );
};

// createElement takes in 3 parameters.
// 1. html element or another component
// 2. object of attributes for that element or component
// 3. single child or array of children

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
