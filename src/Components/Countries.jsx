import React, { useEffect, useState } from "react";

function CountryCard({ props }) {
  const { image, title, altName } = props;
  return (
    <div
      className="countryCard"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "10px",
        margin: "10px",
        border: "1px solid black",
        borderRadius: "8px",
        width: "200px",
        height: "200px",
      }}
    >
      <img
        src={image}
        alt={altName}
        style={{
          width: "100px",
          height: "100px",
        }}
      />
      <h2>{title}</h2>
    </div>
  );
}

const Countries = () => {
  const API = `https://restcountries.com/v3.1/all`;

  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => console.error(e));
  }, [API]);

  const handleChange = (event) => {
    setInputData(event.target.value);
  };

  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "7vh",
          backgroundColor: "#EAEDED",
        }}
      >
        <input
          type="text"
          style={{
            width: "50vw",
            height: "2vh",
            border: "1px solid black",
            padding: "5px",
          }}
          value={inputData}
          onChange={handleChange}
        />
      </nav>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {data
          .filter((item) => {
            return inputData === ""
              ? item
              : item.name.common
                  .toLowerCase()
                  .includes(inputData.toLowerCase());
          })
          .map((item, idx) => (
            <CountryCard
              key={item.id}
              props={{
                image: item.flags.png,
                title: item.name.common,
                altName: item.flags.alt,
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default Countries;
