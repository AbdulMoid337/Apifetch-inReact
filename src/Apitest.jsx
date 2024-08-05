import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ApiTest() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    getImg();
  }, []);

  const getImg = async () => {
    try {
      let imagesArray = [];
      for (let i = 0; i < 8; i++) {
        const response = await axios.get(
          "https://dog.ceo/api/breeds/image/random"
        );
        imagesArray.push(response.data.message);
      }
      setImages(imagesArray);
    } catch (error) {
      console.error("No data");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h3>Random Images API</h3>
      <button
        onClick={getImg}
        style={{
          padding: "10px 20px",
          margin: "20px 0",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Click to Generate Images
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "28px",
        }}
      >
        {images.map((res, i) => {
          return (
            <img
              src={res}
              alt="Random image"
              key={i}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
