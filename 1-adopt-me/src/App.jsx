import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SeachParams from "./components/SearchParams";
import Details from "./pages/Details";
import AdoptedPetCtx from "./context/AdoptedPetContext";

// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, "Adopt me!"),
//     React.createElement(Friends, { name: "Sahas" }),
//     React.createElement(Friends, { name: "Kuldeep" }),
//     React.createElement(Friends, { name: "Subham" }),
//   ]);
// };

const queryProvider = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedpet = useState(null);

  return (
    <BrowserRouter>
      <AdoptedPetCtx.Provider value={adoptedpet}>
        <QueryClientProvider client={queryProvider}>
          <header>
            <Link to="/">Adopt me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SeachParams />} />
          </Routes>
        </QueryClientProvider>
      </AdoptedPetCtx.Provider>
    </BrowserRouter>
  );
};

// createElement takes in 3 parameters.
// 1. html element or another component
// 2. object of attributes for that element or component
// 3. single child or array of children

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
